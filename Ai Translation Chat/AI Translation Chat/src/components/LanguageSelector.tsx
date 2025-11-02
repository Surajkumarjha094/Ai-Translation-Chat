import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftRight } from "lucide-react";

interface LanguageSelectorProps {
  sourceLanguage: string;
  targetLanguage: string;
  onSourceChange: (language: string) => void;
  onTargetChange: (language: string) => void;
}

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
];

export const LanguageSelector = ({
  sourceLanguage,
  targetLanguage,
  onSourceChange,
  onTargetChange,
}: LanguageSelectorProps) => {
  const swapLanguages = () => {
    const temp = sourceLanguage;
    onSourceChange(targetLanguage);
    onTargetChange(temp);
  };

  const getLanguageName = (code: string) => {
    const lang = languages.find(l => l.code === code);
    return lang ? `${lang.flag} ${lang.name}` : code;
  };

  return (
    <Card className="p-4 bg-gradient-chat border-0 shadow-card">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            From
          </label>
          <Select value={sourceLanguage} onValueChange={onSourceChange}>
            <SelectTrigger className="w-full bg-background border-0">
              <SelectValue>
                {getLanguageName(sourceLanguage)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <span className="flex items-center space-x-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col items-center">
          <div className="h-6" /> {/* Spacer for alignment */}
          <Button
            variant="ghost"
            size="sm"
            onClick={swapLanguages}
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors animate-pulse-glow"
          >
            <ArrowLeftRight className="w-4 h-4 text-primary" />
          </Button>
        </div>

        <div className="flex-1">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            To
          </label>
          <Select value={targetLanguage} onValueChange={onTargetChange}>
            <SelectTrigger className="w-full bg-background border-0">
              <SelectValue>
                {getLanguageName(targetLanguage)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {languages
                .filter(lang => lang.code !== sourceLanguage)
                .map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <span className="flex items-center space-x-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};