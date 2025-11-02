import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { VoiceRecorder } from "@/components/VoiceRecorder";
import { translateText } from "@/lib/translation";
import { useToast } from "@/hooks/use-toast";
import { Send, Volume2, Copy, CheckCircle, MessageCircle } from "lucide-react";

interface Message {
  id: string;
  text: string;
  translation: string;
  language: string;
  targetLanguage: string;
  timestamp: Date;
  isUser: boolean;
}

interface TranslationChatProps {
  sourceLanguage: string;
  targetLanguage: string;
}

export const TranslationChat = ({ sourceLanguage, targetLanguage }: TranslationChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    setIsTranslating(true);
    const messageId = Date.now().toString();

    // Add user message
    const userMessage: Message = {
      id: messageId,
      text: text.trim(),
      translation: "",
      language: sourceLanguage,
      targetLanguage,
      timestamp: new Date(),
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      // Simulate translation (replace with actual API call)
      const translation = await translateText(text.trim(), sourceLanguage, targetLanguage);
      
      // Update message with translation
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, translation }
            : msg
        )
      );
      
      toast({
        title: "Translation completed",
        description: "Message translated successfully",
      });

    } catch (error) {
      toast({
        title: "Translation failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsTranslating(false);
      setInputText("");
    }
  };

  const handleVoiceInput = (transcript: string) => {
    setInputText(transcript);
  };

  const speakText = (text: string, language: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const copyToClipboard = async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(messageId);
      setTimeout(() => setCopiedId(null), 2000);
      toast({
        title: "Copied to clipboard",
        description: "Text copied successfully",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Chat Messages */}
      <Card className="p-6 mb-6 h-96 overflow-y-auto bg-gradient-chat border-0 shadow-card">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Start a conversation by typing or speaking...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="animate-slide-up">
                {/* Original Message */}
                <div className="flex items-start space-x-3 mb-2">
                  <div className="p-2 rounded-full bg-primary/10">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-primary">
                        Original ({sourceLanguage.toUpperCase()})
                      </span>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => speakText(message.text, sourceLanguage)}
                          className="h-8 w-8 p-0"
                        >
                          <Volume2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(message.text, `${message.id}-original`)}
                          className="h-8 w-8 p-0"
                        >
                          {copiedId === `${message.id}-original` ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <p className="bg-muted/50 rounded-lg p-3 text-foreground">
                      {message.text}
                    </p>
                  </div>
                </div>

                {/* Translation */}
                {message.translation && (
                  <div className="flex items-start space-x-3 ml-8">
                    <div className="p-2 rounded-full bg-accent/10">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-accent">
                          Translation ({targetLanguage.toUpperCase()})
                        </span>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => speakText(message.translation, targetLanguage)}
                            className="h-8 w-8 p-0"
                          >
                            <Volume2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(message.translation, `${message.id}-translation`)}
                            className="h-8 w-8 p-0"
                          >
                            {copiedId === `${message.id}-translation` ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <p className="bg-accent/10 rounded-lg p-3 text-foreground animate-typing">
                        {message.translation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isTranslating && (
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-accent/10">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                </div>
                <div className="bg-accent/10 rounded-lg p-3 animate-pulse">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </Card>

      {/* Input Area */}
      <Card className="p-4 bg-card border-0 shadow-card">
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Type your message in ${sourceLanguage === 'en' ? 'English' : sourceLanguage === 'es' ? 'Spanish' : 'your language'}...`}
              className="min-h-[80px] resize-none border-0 bg-muted/30 focus:bg-background transition-colors"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(inputText);
                }
              }}
            />
          </div>
          
          <div className="flex flex-col space-y-2">
            <VoiceRecorder 
              onTranscript={handleVoiceInput}
              language={sourceLanguage}
            />
            <Button
              onClick={() => handleSendMessage(inputText)}
              disabled={!inputText.trim() || isTranslating}
              className="bg-gradient-primary border-0 shadow-glow hover:shadow-glow"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};