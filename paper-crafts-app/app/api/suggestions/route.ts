import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  try {
    const prompt = `Generate 3 creative, child-friendly craft ideas for a 7-year-old girl. 
    Make them magical, fun, and age-appropriate. 
    Focus on simple, descriptive phrases that a child would understand.
    Examples: "magical unicorn castle", "cute robot friend", "pink princess garden"
    
    Return ONLY a JSON array of 3 simple strings, like this:
    ["magical unicorn castle", "cute robot friend", "pink princess garden"]`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8, // More creative
      max_tokens: 150,
    });

    const content = response.choices[0].message.content || '[]';
    // Remove markdown code blocks if present
    const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
    const suggestions = JSON.parse(cleanContent);
    
    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('Error generating suggestions:', error);
    // Fallback to static suggestions
    return NextResponse.json({ 
      suggestions: ['magical unicorn castle', 'cute robot friend', 'pink princess garden'] 
    });
  }
}
