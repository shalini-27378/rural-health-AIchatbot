"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Mic, AlertCircle } from "lucide-react";
import QuickButtons from "./QuickButtons";
import LanguageSelector from "./LanguageSelector";
import { sendMessage } from "@/lib/api";  // ← Added this import

// Define message type
type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

// Language translations
const translations = {
  en: {
    title: "🏥 Rural Health Advisor",
    subtitle: "Your personal health guide",
    placeholder: "Type your health question...",
    alert: "⚠️ For emergencies, call 108 or visit nearest hospital",
    typing: "Assistant is typing..."
  },
  hi: {
    title: "🏥 ग्रामीण स्वास्थ्य सलाहकार",
    subtitle: "आपका व्यक्तिगत स्वास्थ्य मार्गदर्शक",
    placeholder: "अपना स्वास्थ्य प्रश्न लिखें...",
    alert: "⚠️ आपातकालीन स्थिति में 108 डायल करें या नजदीकी अस्पताल जाएं",
    typing: "सहायक टाइप कर रहा है..."
  },
  ta: {
    title: "🏥 கிராமப்புற சுகாதார ஆலோசகர்",
    subtitle: "உங்கள் தனிப்பட்ட சுகாதார வழிகாட்டி",
    placeholder: "உங்கள் சுகாதார கேள்வியை தட்டச்சு செய்க...",
    alert: "⚠️ அவசர காலத்தில் 108 ஐ அழைக்கவும் அல்லது அருகிலுள்ள மருத்துவமனைக்கு செல்லவும்",
    typing: "உதவியாளர் தட்டச்சு செய்கிறார்..."
  }
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Hello! I'm your Rural Health Advisor. How can I help you today?",
      sender: "bot"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [language, setLanguage] = useState<"en" | "hi" | "ta">("en");
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Get current language text
  const t = translations[language];

  // Handle send message - UPDATED WITH REAL API
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: "user"
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      // Call actual backend API
      const botResponse = await sendMessage(inputText, language);
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot"
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      // Show error message
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble connecting. Please try again.",
        sender: "bot"
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 rounded-2xl mb-4 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{t.title}</h1>
            <p className="text-blue-100 text-sm mt-1">{t.subtitle}</p>
          </div>
          <LanguageSelector language={language} setLanguage={setLanguage} />
        </div>
      </div>

      {/* Alert Banner */}
      {showAlert && (
        <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4 rounded-lg flex items-center gap-2">
          <AlertCircle className="text-red-500 w-5 h-5" />
          <p className="text-red-700 text-sm flex-1">{t.alert}</p>
          <button 
            onClick={() => setShowAlert(false)}
            className="text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}

      {/* Quick Action Buttons */}
      <QuickButtons language={language} setInputText={setInputText} inputRef={inputRef} />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={message.sender === "user" ? "message-user" : "message-bot"}
          >
            {message.text}
          </div>
        ))}
        
        {isLoading && (
          <div className="message-bot opacity-70">
            <span className="animate-pulse">{t.typing}</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-200">
        <div className="flex gap-2">
          <button className="p-3 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition">
            <Mic className="w-5 h-5" />
          </button>
          
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder={t.placeholder}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            disabled={isLoading}
          />
          
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputText.trim()}
            className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}