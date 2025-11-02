# 🌐 AI Translation Chat

A modern, real-time translation application powered by **Google Translate API** with voice recording capabilities and an intuitive chat interface.

---

## ✨ Features

- ⚡ **Real-time Translation** — Translate text instantly between multiple languages  
- 🎤 **Voice Recording** — Record your voice and translate speech to text  
- 💬 **Chat Interface** — Conversational UI for easy interactions  
- 🌎 **Multiple Languages** — English, Spanish, French, German, Italian, Portuguese, Japanese, Korean, Chinese, Russian, Arabic  
- 🕵️‍♂️ **Auto-detect Language** — Automatically detects the source language  
- 🔄 **Fallback System** — Mock translation when API is unavailable  
- 📱 **Responsive Design** — Beautiful UI for all devices  

---

## 🚀 Tech Stack

- **Frontend:** React 18 + TypeScript  
- **Build Tool:** Vite  
- **Styling:** Tailwind CSS  
- **UI Components:** shadcn/ui  
- **Backend:** Supabase Edge Functions  
- **Translation API:** Google Translate API  
- **Deployment:** Lovable Platform  

---

## 📋 Prerequisites

- Node.js 18+ and npm  
- Google Cloud Console account  
- Google Translate API key  

---

## 🔧 Setup Instructions

### 1. Clone the Repository
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Get Google Translate API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)  
2. Create a new project or select an existing one  
3. Enable the Google Translate API  
4. Go to "Credentials" → Create API key  
5. Copy the API key  

### 4. Configure Environment Variables
Set up `GOOGLE_TRANSLATE_API_KEY` in Supabase Edge Functions:  
1. Go to your Supabase project → Settings → Edge Functions → Secrets  
2. Add `GOOGLE_TRANSLATE_API_KEY` with your API key  

### 5. Start Development Server
```bash
npm run dev
```
Open: `http://localhost:5173`

---

## 📁 Project Structure
```
├── src/
│   ├── components/
│   │   ├── LanguageSelector.tsx    # Language dropdowns
│   │   ├── TranslationChat.tsx     # Main chat interface
│   │   ├── VoiceRecorder.tsx       # Voice recording component
│   │   └── ui/                     # shadcn/ui components
│   ├── lib/
│   │   ├── translation.ts          # Translation logic with fallback
│   │   └── utils.ts                # Utility functions
│   ├── pages/
│   │   └── Index.tsx               # Main page
│   └── main.tsx                    # App entry point
├── supabase/
│   └── functions/
│       └── translate/
│           └── index.ts            # Edge function for Google Translate API
└── public/
    └── robots.txt
```

---

## 🎯 Usage

1. **Select Languages** — Source and target languages from dropdowns  
2. **Type Message** — Enter text in chat input  
3. **Get Translation** — Press Enter or click send  
4. **Voice Recording** — Click microphone icon to record (coming soon)  
5. **View Results** — Translations appear in chat interface  

---

## 🌍 Supported Languages

- English, Spanish, French, German, Italian, Portuguese  
- Japanese, Korean, Chinese (Simplified), Russian, Arabic  

---

## 🔒 Security

- API keys stored securely in Supabase Edge Function environment variables  
- CORS properly configured  
- No sensitive data exposed to client  

---

