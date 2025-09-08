# Supabase Setup Guide for Paper Crafts App

## Overview
The Save to Collection feature uses Supabase to store and retrieve Princess Bella's magical crafts. Follow these steps to set up Supabase integration.

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in to your account
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `paper-crafts-app` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to you
5. Click "Create new project"
6. Wait for the project to be set up (usually takes 1-2 minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **anon public** key (starts with `eyJ`)

## Step 3: Create Environment Variables

1. In your project root, create a file called `.env.local`
2. Add the following content:

```bash
# OpenAI API Key (required)
OPENAI_API_KEY=your_openai_api_key_here

# Supabase Configuration (required for collection feature)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

3. Replace the placeholder values with your actual keys:
   - `your_openai_api_key_here` → Your OpenAI API key
   - `your_supabase_url_here` → Your Supabase Project URL
   - `your_supabase_anon_key_here` → Your Supabase anon public key

## Step 4: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the following SQL:

```sql
-- Create crafts table
CREATE TABLE crafts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  craft_type TEXT,
  user_input TEXT NOT NULL,
  word_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID DEFAULT gen_random_uuid() -- For future user authentication
);

-- Create index for better performance
CREATE INDEX idx_crafts_created_at ON crafts(created_at DESC);
CREATE INDEX idx_crafts_craft_type ON crafts(craft_type);

-- Enable Row Level Security (RLS)
ALTER TABLE crafts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (for now)
-- In production, you'd want more restrictive policies
CREATE POLICY "Allow all operations" ON crafts
  FOR ALL USING (true) WITH CHECK (true);
```

4. Click "Run" to execute the SQL

## Step 5: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open `http://localhost:3000`

3. Create a craft and click "Save to Collection"

4. Click "View Collection" to see your saved crafts

## Step 6: Verify Data in Supabase

1. In your Supabase dashboard, go to **Table Editor**
2. Click on the `crafts` table
3. You should see your saved crafts listed there

## Troubleshooting

### Common Issues:

1. **"Failed to save craft to collection"**
   - Check that your `.env.local` file has the correct Supabase credentials
   - Verify the database schema was created correctly
   - Check the browser console for detailed error messages

2. **"Failed to fetch collection"**
   - Ensure the `crafts` table exists in your Supabase database
   - Check that RLS policies are set up correctly
   - Verify your Supabase URL and anon key are correct

3. **Environment variables not loading**
   - Make sure `.env.local` is in the project root directory
   - Restart your development server after adding environment variables
   - Check that variable names start with `NEXT_PUBLIC_` for client-side access

### Getting Help:

- Check the Supabase documentation: [docs.supabase.com](https://docs.supabase.com)
- Check the browser console for error messages
- Verify your Supabase project is active and not paused

## Security Notes

- The current setup allows all operations on the crafts table
- For production, consider implementing user authentication
- Add more restrictive RLS policies based on your needs
- Never commit your `.env.local` file to version control
