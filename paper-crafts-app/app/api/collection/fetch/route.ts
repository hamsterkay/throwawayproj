import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function GET() {
  try {
    const { data: crafts, error } = await supabase
      .from('crafts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch collection' },
        { status: 500 }
      );
    }

    // Calculate stats
    const totalCrafts = crafts?.length || 0;
    const totalWords = crafts?.reduce((sum, craft) => sum + (craft.word_count || 0), 0) || 0;
    
    const craftsByType = crafts?.reduce((acc, craft) => {
      const type = craft.craft_type || 'unknown';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number }) || {};

    return NextResponse.json({
      crafts: crafts || [],
      stats: {
        total_crafts: totalCrafts,
        total_words: totalWords,
        crafts_by_type: craftsByType,
      }
    });

  } catch (err: any) {
    console.error('Fetch collection error:', err);
    return NextResponse.json(
      { error: 'The fairy godmother needs a moment to gather your collection. Please try again! ✨' },
      { status: 500 }
    );
  }
}
