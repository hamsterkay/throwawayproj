import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const { input } = await req.json();
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            "You are a content safety filter for a children's craft app. Reply with exactly 'SAFE' or 'UNSAFE: <brief reason>'.",
        },
        { role: 'user', content: `Is this appropriate for a 7-year-old: "${input}"` },
      ],
      max_tokens: 30,
      temperature: 0.1,
    });

    const text = completion.choices[0]?.message?.content?.trim() ?? 'SAFE';
    const safe = text.startsWith('SAFE');
    return NextResponse.json({ safe });
  } catch (err) {
    // Fail open but log on server
    console.error('Validate API error', err);
    return NextResponse.json({ safe: true });
  }
}



