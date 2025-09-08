import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createCraftPrompt } from '../../../utils/openai';

export async function POST(req: Request) {
  try {
    const { input, craftType } = await req.json();
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = createCraftPrompt(input, craftType);
    const image = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `${prompt}

CRITICAL REQUIREMENTS - MUST BE FOLLOWED EXACTLY:
- ABSOLUTELY NO COLORS - BLACK AND WHITE ONLY
- NO YELLOW BACKGROUND - MUST BE PURE WHITE BACKGROUND
- NO COLORS, NO FILL, NO SHADING, NO TINTS, NO HUE
- ONLY BLACK OUTLINES ON PURE WHITE BACKGROUND
- NO BACKGROUND COLORS, NO BACKGROUND PATTERNS
- NO YELLOW, NO BLUE, NO PINK, NO GREEN, NO ANY COLOR
- PURE WHITE BACKGROUND WITH BLACK LINES ONLY
- Generous margins on ALL sides (25% minimum)
- No elements touching edges
- FOR MAZES: Must have clearly visible "START" and "FINISH" text labels`,
      size: '1024x1792', // Portrait aspect ratio (8.5:11 paper ratio)
      quality: 'standard',
      n: 1,
      style: 'natural',
    });

    const imageUrl = image.data[0]?.url;
    if (!imageUrl) throw new Error('No image generated');

    const titleCompletion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'Create a short, magical, encouraging craft title (2-4 words) for a 7-year-old named Bella. Include the craft type in the title if specified.',
        },
        { role: 'user', content: `Craft idea: ${input}${craftType ? ` (${craftType})` : ''}` },
      ],
      max_tokens: 16,
      temperature: 0.8,
    });

    const title =
      titleCompletion.choices[0]?.message?.content?.trim().replace(/['"]/g, '') ||
      `Bella's Magical ${craftType ? String(craftType).replace('-', ' ') : 'Craft'}`;

    return NextResponse.json({ imageUrl, title });
  } catch (err: any) {
    console.error('Generate API error', err);
    return NextResponse.json(
      { error: 'The fairy godmother needs a moment to gather more sparkles. Please try again! ✨' },
      { status: 500 }
    );
  }
}



