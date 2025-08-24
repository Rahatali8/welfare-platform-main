import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: 'API key missing.' }, { status: 500 });
    }
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    return NextResponse.json({ models: data.models || [], raw: data });
  } catch (err) {
    return NextResponse.json({ error: 'Error fetching models.' }, { status: 500 });
  }
}
