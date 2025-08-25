// Survey input form for officer
import React from "react";


import { useState } from "react";

export default function SurveyForm({ survey, refresh }: any) {
  const [report, setReport] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  if (!survey) return null;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    let attachments: string[] = [];

    // Upload files if any
    if (files && files.length > 0) {
      // For demo: just use file names as URLs
      attachments = Array.from(files).map((f) => f.name);
      // TODO: Implement actual file upload and get URLs
    }

    await fetch("/api/survey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        surveyId: survey.id,
        status: "Completed",
        recommendation,
        report,
        attachments,
      }),
    });
    setLoading(false);
    setReport("");
    setRecommendation("");
    setFiles(null);
    if (refresh) refresh();
  };

  return (
    <form className="bg-white p-4 rounded shadow" onSubmit={handleSubmit}>
      <h3 className="font-semibold mb-2">Survey Report Submission</h3>
      <textarea
        className="w-full border p-2 mb-2"
        placeholder="Enter survey notes..."
        value={report}
        onChange={(e) => setReport(e.target.value)}
        required
      />
      <input
        type="file"
        multiple
        className="mb-2"
        onChange={(e) => setFiles(e.target.files)}
      />
      <select
        className="w-full border p-2 mb-2"
        value={recommendation}
        onChange={(e) => setRecommendation(e.target.value)}
        required
      >
        <option value="">Select Recommendation</option>
        <option value="Eligible">Verified (Eligible)</option>
        <option value="Not Eligible">Not Verified</option>
        <option value="Needs Info">Needs More Info</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Report"}
      </button>
    </form>
  );
}
