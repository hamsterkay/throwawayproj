export interface CraftGenerationResult {
  imageUrl: string;
  title: string;
  description?: string;
}

// NOTE: This module now only contains shared prompt helpers used by server API routes.
// All OpenAI calls run server-side in /app/api to keep your API key safe.

function createCraftPrompt(userInput: string, craftType?: string): string {
  const basePrompt = `Create a clean, simple paper craft template for a 7-year-old girl. This should be a basic template with clear lines that she can print and use to make her craft. The template should be designed for 8.5" x 11" paper in portrait orientation. CRITICAL: This must be BLACK AND WHITE ONLY - NO COLORS, NO YELLOW BACKGROUND, NO TINTS, NO HUE - ONLY BLACK LINES ON PURE WHITE BACKGROUND.`;

  const craftTypeInstructions: { [key: string]: string } = {
    'coloring': 'A simple coloring page with clear black outlines only. NO COLORS, NO FILL, NO SHADING - only black line art. No decorative borders, no page layout elements, just the basic line art for coloring. Keep it clean and simple. Leave plenty of white space around all elements.',
    'cutout': 'Simple paper craft pieces with clear cutting lines. Show the individual pieces that need to be cut out. NO COLORS, NO FILL, NO SHADING - only black line art. No decorative borders, no page layout, just the basic template pieces. Ensure all pieces have adequate spacing and margins.',
    'paperdoll': 'A simple paper doll with clothing pieces. Show the doll and clothes as basic line art with clear cutting lines. Include small tabs on clothing pieces. NO COLORS, NO FILL, NO SHADING - only black line art. No decorative borders or page layout. Leave generous white space around all elements.',
    'colorbynumber': 'Simple shapes with numbers inside them. Basic line art only. NO COLORS, NO FILL, NO SHADING - only black line art. No decorative borders, no page layout, just numbered shapes for coloring. Ensure all shapes are well-spaced with margins.',
    'origami': 'A simple square or rectangle with basic fold lines. No decorative elements, no page layout, just the basic paper template with fold lines. NO COLORS, NO FILL, NO SHADING - only black line art. Center the design with plenty of white space around it.',
    'maze': 'A simple maze with basic lines. MUST have clearly marked "START" and "FINISH" labels at the beginning and end of the maze path. No decorative borders, no page layout, just the maze pattern with obvious start and finish points. NO COLORS, NO FILL, NO SHADING - only black line art. Leave adequate margins around the entire maze.',
  };

  const typeInstruction = craftType ? craftTypeInstructions[craftType] || '' : '';

  const specificRequirements = `
    - ABSOLUTELY NO COLORS - BLACK AND WHITE ONLY
    - NO YELLOW BACKGROUND - MUST BE PURE WHITE BACKGROUND
    - NO COLORS, NO FILL, NO SHADING, NO RAINBOW COLORS, NO TINTS, NO HUE
    - ONLY BLACK OUTLINES ON PURE WHITE BACKGROUND
    - NO BACKGROUND COLORS, NO BACKGROUND PATTERNS, NO DECORATIVE ELEMENTS
    - NO YELLOW, NO BLUE, NO PINK, NO GREEN, NO ANY COLOR
    - PURE WHITE BACKGROUND WITH BLACK LINES ONLY
    - Simple, clean design with high contrast for clear printing
    - Child-friendly theme but NO COLORS
    - Basic template only - no fancy page design
    - CRITICAL: Leave generous margins on ALL FOUR SIDES (at least 25% margin on left, right, top, and bottom)
    - Ensure all craft pieces fit completely within the image boundaries with equal spacing on all sides
    - No elements should be cut off or touching ANY edges
    - The design should be centered with equal white space on left and right sides
    ${typeInstruction}
  `;

  const craftTypePrefix = craftType ? `Create a simple ${craftType} template of: ` : 'Create a simple template of: ';
  return `${basePrompt} ${craftTypePrefix}${userInput}. ${specificRequirements}`;
}

export { createCraftPrompt };
