import { NextResponse } from 'next/server';
import { supabase, CraftRecord } from '../../../../lib/supabase';

export async function POST(req: Request) {
  try {
    const { title, imageUrl, craftType, userInput, wordCount } = await req.json();

    if (!title || !imageUrl || !userInput) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const craftRecord: Omit<CraftRecord, 'id' | 'created_at'> = {
      title,
      image_url: imageUrl,
      craft_type: craftType || null,
      user_input: userInput,
      word_count: wordCount || 0,
    };

    const { data, error } = await supabase
      .from('crafts')
      .insert([craftRecord])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save craft to collection' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      craft: data,
      message: 'Craft saved to your magical collection! 💖'
    });

  } catch (err: any) {
    console.error('Save to collection error:', err);
    return NextResponse.json(
      { error: 'The fairy godmother needs a moment to organize your collection. Please try again! ✨' },
      { status: 500 }
    );
  }
}
