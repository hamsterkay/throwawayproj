# 🧚‍♀️ Paper Crafts Fairy Godmother App

A magical web app for Bella (7 years old) to practice typing while creating AI-generated paper crafts. The app feels like interacting with a fairy godmother who creates magical printable crafts based on typed descriptions.

## ✨ Features

- **Magical Typing Interface**: Word counter with encouragement for 7-year-olds
- **AI Craft Generation**: Uses OpenAI's DALL-E 3 to create printable line art
- **Craft Type Selection**: Choose from coloring pages, cut-outs, paper dolls, and more
- **Print Optimization**: Black & white line art optimized for 8.5x11" paper
- **Progress Tracking**: Milestones and celebration animations
- **Touch-Friendly**: Designed for iPad with large touch targets (60px+)
- **Magical Theme**: Pink/pastel colors, sparkles, hearts, and encouraging messages

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root directory with:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom magical theme
- **Animations**: Framer Motion
- **State Management**: Zustand
- **AI Integration**: OpenAI API (GPT-4 + DALL-E 3)
- **Printing**: React-to-Print
- **Database**: Supabase (for future collection features)

## 🎨 Design System

### Colors
- **Primary**: Magical Pink (#FF69B4)
- **Secondary**: Pastel Purple, Blue, Yellow
- **Accent**: Gold for achievements
- **Background**: Soft gradients

### Typography
- **Child-friendly**: Large fonts (18px+)
- **Font Family**: Inter (clean, readable)
- **Sizes**: 3xl for titles, xl for body text

### Animations
- Sparkle particles floating across screen
- Gentle bounce effects on buttons
- Confetti on craft completion
- Smooth transitions between screens

## 📱 User Experience

### Target User
- **Primary**: Bella, 7 years old, 2nd grader
- **Device**: iPad (touch-first, keyboard compatible)
- **Session Length**: 10-15 minutes

### Key Features
1. **Welcome Screen**: Magical greeting with animations
2. **Typing Area**: Word counter, needs 3+ words to proceed
3. **Craft Selection**: Choose craft type for simple requests
4. **Loading**: Fun animations while AI generates (10-15 seconds)
5. **Display & Print**: Show craft with print instructions
6. **Collection**: Save crafts (future feature)

## 🔧 Development

### Project Structure
```
/components
  /Layout.tsx          # Magical background with sparkles
  /TypingArea.tsx      # Word counter and input validation
  /CraftTypeSelector.tsx # Craft type selection
  /LoadingMagic.tsx    # Loading animations
  /CraftDisplay.tsx    # Print-ready craft display
/store
  /useCraftStore.ts    # Zustand state management
/utils
  /openai.ts          # OpenAI API integration
```

### Key Components

#### TypingArea
- Real-time word counting (excluding common words)
- Visual feedback when 3+ words reached
- Encouraging messages as she types
- Virtual keyboard friendly

#### CraftTypeSelector
- Large card options for different craft types
- Icons and descriptions for each type
- Skip option for specific craft requests

#### LoadingMagic
- Spinning wand or fairy dust animation
- Rotating encouraging messages
- Progress bar with sparkle effects

#### CraftDisplay
- Print-optimized image display
- Step-by-step instructions
- Print button using react-to-print
- Save to collection functionality

## 🎯 Milestone System

Tracks and celebrates:
- Total words typed
- Crafts created
- Special achievements (50 words, 5 crafts, etc.)
- Visual celebrations with confetti and animations

## 🖨️ Print Optimization

- Generates print-ready PDFs
- 8.5x11" paper formatting
- High contrast black & white line art
- Margin considerations for safe cutting
- Print CSS removes backgrounds and colors

## 🔒 Safety & Content

- Content safety filtering using GPT-4
- Kid-friendly content validation
- Clear "Ask an adult" prompts for scissors use
- No external links without parental approval
- No permanent data collection

## 🚀 Future Features

- **Phase 2**: Collection gallery, enhanced animations
- **Phase 3**: Voice input, craft sharing, achievement badges
- **PWA**: Add to home screen functionality
- **Supabase**: Backend for craft collection and progress tracking

## 📝 Environment Variables

```env
# Required
OPENAI_API_KEY=your_openai_api_key_here

# Optional (for future Supabase integration)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## 🎉 Getting Started for Bella

1. Open the app on her iPad
2. Click "Start Creating Magic!"
3. Type what she wants to make (at least 3 words)
4. Choose a craft type (or let the fairy godmother decide)
5. Watch the magical loading animation
6. Print and enjoy her creation!

The app is designed to make typing practice feel like playing with a real fairy godmother! ✨🧚‍♀️💖