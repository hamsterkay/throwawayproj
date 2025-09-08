# 🧚‍♀️ Setup Instructions for Paper Crafts Fairy Godmother App

## Quick Setup (5 minutes)

### 1. Get Your OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Go to "API Keys" in the left sidebar
4. Click "Create new secret key"
5. Copy the key (starts with `sk-`)

### 2. Set Up Environment Variables
1. In your project folder, create a file called `.env.local`
2. Add this line to the file:
   ```
   OPENAI_API_KEY=your_actual_api_key_here
   ```
   (Replace `your_actual_api_key_here` with the key you copied)

### 3. Start the App
1. Open terminal in your project folder
2. Run: `npm run dev`
3. Open your browser to: `http://localhost:3000`

### 4. Test It Out!
1. Click "Start Creating Magic!"
2. Type something like "a pink unicorn with a crown"
3. Choose a craft type or skip
4. Watch the magic happen! ✨

## For iPad Testing
1. Make sure your iPad and computer are on the same WiFi
2. Find your computer's IP address (run `ifconfig` on Mac/Linux or `ipconfig` on Windows)
3. On your iPad, go to `http://YOUR_IP_ADDRESS:3000`
4. Add to home screen for a native app feel!

## Troubleshooting

### "API Key not found" error
- Make sure your `.env.local` file is in the root folder (same level as `package.json`)
- Check that the API key starts with `sk-`
- Restart the development server after adding the key

### "Network error" when generating crafts
- Check your internet connection
- Verify your OpenAI API key is valid
- Make sure you have credits in your OpenAI account

### App looks broken on iPad
- Try refreshing the page
- Make sure you're using Safari (works best)
- Check that you're using the IP address, not localhost

## What's Included

✅ **Complete magical UI** with sparkles and animations  
✅ **Typing interface** with word counting and encouragement  
✅ **AI craft generation** using DALL-E 3  
✅ **Print optimization** for black & white crafts  
✅ **Progress tracking** with milestones and celebrations  
✅ **Touch-friendly design** for iPad use  
✅ **Child-safe content filtering**  

## Next Steps (Optional)

- Add Supabase for saving crafts to a collection
- Implement voice input for easier typing
- Add more craft types and templates
- Create seasonal themes and special events

The app is ready to use! Bella will love creating magical crafts while practicing her typing! 🧚‍♀️✨💖

