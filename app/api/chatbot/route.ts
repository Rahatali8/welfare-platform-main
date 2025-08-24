import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    // Gemini API key from env
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      return NextResponse.json({ reply: 'API key missing.' }, { status: 500 });
    }

    // Website context for Gemini prompt

    const websiteContext = `
      You are a helpful chatbot for the Himayyat platform, which is a program of Idara Al-Khair. Answer all questions as the Himayyat project is part of Idara Al-Khair.
      Here is the website information:

      Organization: Idara Al-Khair
      Founded: 2010
      Vision: Serve humanity
      Mission: To provide comprehensive welfare services that empower individuals and families to achieve self-sufficiency, dignity, and prosperity. Sustainable solutions for poverty and social challenges.
      Milestones: Digital platform, 50,000+ families helped, COVID relief, microfinance, AI integration
      Values: Compassion, empathy, dignity, respect, transparency, community, impact

      Leadership Team:
      - Muhammad Muzahir Sheikh: Chairman & Founder (Leading social welfare initiatives for over 20 years)
      - Muhammad Saad Sheikh: Head of Technology Department (Expert in welfare program management and community development)
      - Miss Tasneem Sheikh: Director of Operations (Driving digital transformation in welfare services)

      Contact Information:
      - Phone: +92 21 1234 5678 (24/7)
      - Email: @welfareplatform.org (response within 2 hours)
      - WhatsApp: +92 300 1234567 (24/7)
      - Live Chat: Website (9 AM - 9 PM)

      Services:
      - Business Development Loans (PKR 50,000 - PKR 2,000,000, low interest, mentoring, flexible repayment)
      - Medical Assistance
      - Scholarships
      - Food & Nutrition
      - Shelter
      - Emergency Relief
      - And more

      FAQs:
      - Applications, eligibility, financial, security, process—total 24+ questions.
      - Categories: Applications, Eligibility, Financial, Security, Process.

      Stats:
      - Weekly requests: 100 to 475+ per week.
      - Daily requests, types, signups, analytics.

      Success Stories:
      - Fatima Bibi (Lahore): Business Loan, PKR 300,000, income increased, employs 3 women.
      - Muhammad Akram (Karachi): Emergency Medical Aid, PKR 150,000, heart surgery.
      - Aisha Khan (Islamabad): Education Support, PKR 80,000, MBA degree.

      Always answer user questions using this information. If the question is general, answer politely and conversationally. If the question is about the website, use the website's information and context. Always reply in a friendly, helpful, and clear way. If you don't know the answer, say you don't know but try to guide the user.

      IMPORTANT: If the user asks in Roman Urdu, reply in Roman Urdu. If the user asks in English, reply in English. If the user mixes both, reply in the same style. Never use Urdu script, only Roman Urdu or English.
    `;

    // Gemini 2.5 Flash API endpoint
    const url = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=' + GEMINI_API_KEY;
    const payload = {
      contents: [{ parts: [{ text: websiteContext + '\nUser: ' + message }] }]
    };

    let reply = 'No answer found.';
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      // Debug log: full response
      console.log('Gemini API response:', JSON.stringify(data, null, 2));
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        reply = data.candidates[0].content.parts[0].text;
      } else if (data?.error) {
        reply = `Error: ${data.error.message || 'Unknown error.'}`;
      }
    } catch (apiErr) {
      console.error('Gemini API error:', apiErr);
      reply = 'Error connecting to Gemini API.';
    }
    return NextResponse.json({ reply });
  } catch (err) {
    return NextResponse.json({ reply: 'Error processing request.' }, { status: 500 });
  }
}
