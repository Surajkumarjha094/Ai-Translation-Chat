import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mic, MicOff, Square } from "lucide-react";

interface VoiceRecorderProps {
  onTranscript: (transcript: string) => void;
  language: string;
}

export const VoiceRecorder = ({ onTranscript, language }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if Web Speech API is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      
      // Initialize speech recognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
        setIsRecording(false);
        
        toast({
          title: "Voice captured",
          description: "Speech converted to text successfully",
        });
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        
        toast({
          title: "Voice recognition failed",
          description: "Please try again or type your message",
          variant: "destructive",
        });
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [language, onTranscript, toast]);

  const startRecording = () => {
    if (!isSupported) {
      toast({
        title: "Voice not supported",
        description: "Your browser doesn't support voice recognition",
        variant: "destructive",
      });
      return;
    }

    try {
      recognitionRef.current.start();
      setIsRecording(true);
      
      toast({
        title: "Listening...",
        description: "Speak now to convert speech to text",
      });
    } catch (error) {
      console.error('Error starting recognition:', error);
      toast({
        title: "Failed to start recording",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  if (!isSupported) {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled
        className="opacity-50"
      >
        <MicOff className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <Button
      variant={isRecording ? "destructive" : "outline"}
      size="sm"
      onClick={isRecording ? stopRecording : startRecording}
      className={`transition-all duration-300 ${
        isRecording 
          ? "bg-destructive hover:bg-destructive/90 animate-pulse-glow shadow-glow" 
          : "hover:bg-primary/10 hover:border-primary"
      }`}
    >
      {isRecording ? (
        <Square className="w-4 h-4" />
      ) : (
        <Mic className="w-4 h-4" />
      )}
    </Button>
  );
};