import { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export type VoiceField = { name: string; label: string; defaultValue?: string };

export function useVoiceFormAgent(
  fields: VoiceField[],
  onFieldFilled: (name: string, value: string) => void
): {
  currentField: VoiceField | null;
  transcript: string;
  listening: boolean;
  waitingForSet: boolean;
  startFieldAgent: (fieldName: string) => void;
  handleResult: () => void;
  stopFieldAgent: () => void;
} {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [currentField, setCurrentField] = useState<VoiceField | null>(null);
  const [waitingForSet, setWaitingForSet] = useState(false);

  // Start voice agent for a specific field
  const startFieldAgent = (fieldName: string) => {
    const field = fields.find(f => f.name === fieldName);
    if (!field) return;

    // If already listening for the same field, do nothing
    if (currentField?.name === fieldName && listening) return;

    // Stop any existing listening so we can switch to the new field cleanly
    try {
      SpeechRecognition.stopListening();
    } catch (e) {
      // noop - some browsers may throw if not listening
    }

    resetTranscript();
    setCurrentField(field);
    setWaitingForSet(true);

    // small delay to allow UI to update before microphone prompt
    setTimeout(() => {
      // start listening if supported
      if (SpeechRecognition.browserSupportsSpeechRecognition()) {
        try {
          SpeechRecognition.startListening({ continuous: true });
        } catch (e) {
          // noop
        }
      }
    }, 200);
  };

  // Listen for user response and fill field
  const handleResult = () => {
    if (!currentField) return;
    let value = transcript.trim();
    if (
      value.toLowerCase().includes('aap fill kar do') ||
      value.toLowerCase().includes('mujh se fill nahi hota')
    ) {
      value = currentField.defaultValue || '';
    }
    // Only allow numbers for CNIC and phone fields
    if (currentField.name === 'cnic' || currentField.name === 'phone') {
      value = value.replace(/\D/g, '');
    }
    onFieldFilled(currentField.name, value);
    resetTranscript();
    SpeechRecognition.stopListening();
    setWaitingForSet(false);
    setCurrentField(null);
  };

  // Effect: Listen for 'set' keyword in transcript to auto-advance
  useEffect(() => {
    if (!waitingForSet) return;
    const t = transcript.toLowerCase();
    if (t.includes('set')) {
      handleResult();
    }
    // we intentionally omit handleResult from deps because it would change identity
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript, waitingForSet]);

  // Cleanup: stop listening if component unmounts or fields change
  useEffect(() => {
    return () => {
      try {
        SpeechRecognition.stopListening();
      } catch (e) {
        // noop
      }
    };
  }, []);

  return {
    currentField,
    transcript,
    listening,
    startFieldAgent,
    handleResult,
    waitingForSet,
    stopFieldAgent: () => {
      try {
        SpeechRecognition.stopListening();
      } catch (e) {
        // noop
      }
      setWaitingForSet(false);
      setCurrentField(null);
      resetTranscript();
    },
  };
}