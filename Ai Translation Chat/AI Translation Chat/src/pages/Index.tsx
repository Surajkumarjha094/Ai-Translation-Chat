import { useState } from "react";
import { TranslationChat } from "@/components/TranslationChat";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Button } from "@/components/ui/button";
import { Globe, MessageCircle, Sparkles } from "lucide-react";

const Index = () => {
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [isTranslating, setIsTranslating] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-primary shadow-glow">
              <Globe className="w-8 h-8 text-white animate-pulse-glow" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                TranslateAI
              </h1>
              <p className="text-sm text-muted-foreground">Breaking language barriers</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm" className="bg-gradient-primary border-0 shadow-glow hover:shadow-glow">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 pb-12">
        {/* Hero Section */}
        {!isTranslating && (
          <div className="text-center py-16 animate-slide-up">
            <div className="inline-block p-4 rounded-full bg-gradient-chat mb-6">
              <MessageCircle className="w-16 h-16 text-primary" />
            </div>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Speak Any Language,
              <br />
              <span className="inline-flex items-center gap-2">
                Instantly <Sparkles className="w-12 h-12 text-accent animate-pulse-glow" />
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Real-time AI translation with voice support. Connect with anyone, anywhere, 
              in their native language.
            </p>
            
            <Button 
              onClick={() => setIsTranslating(true)}
              size="lg"
              className="bg-gradient-primary border-0 shadow-glow hover:shadow-glow text-lg px-8 py-4 h-auto"
            >
              Start Translating
            </Button>
          </div>
        )}

        {/* Translation Interface */}
        {isTranslating && (
          <div className="space-y-6 animate-slide-up">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={() => setIsTranslating(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ← Back to Home
              </Button>
              
              <LanguageSelector
                sourceLanguage={sourceLanguage}
                targetLanguage={targetLanguage}
                onSourceChange={setSourceLanguage}
                onTargetChange={setTargetLanguage}
              />
            </div>

            <TranslationChat 
              sourceLanguage={sourceLanguage}
              targetLanguage={targetLanguage}
            />
          </div>
        )}
      </main>

      {/* Attribution */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="px-3 py-2 bg-card/80 backdrop-blur-sm rounded-full border shadow-card">
          <p className="text-xs text-muted-foreground">
            made by <span className="font-medium bg-gradient-primary bg-clip-text text-transparent">kaif(kattua)</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;