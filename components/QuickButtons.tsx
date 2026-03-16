"use client";

import { Thermometer, Calendar, Heart, Stethoscope } from "lucide-react";

const buttonTranslations = {
  en: {
    fever: "🤒 Fever & Cough",
    vaccine: "💉 Vaccination",
    tips: "🌿 Health Tips",
    symptoms: "🏥 Check Symptoms"
  },
  hi: {
    fever: "🤒 बुखार और खांसी",
    vaccine: "💉 टीकाकरण",
    tips: "🌿 स्वास्थ्य टिप्स",
    symptoms: "🏥 लक्षण जांचें"
  },
  ta: {
    fever: "🤒 காய்ச்சல் மற்றும் இருமல்",
    vaccine: "💉 தடுப்பூசி",
    tips: "🌿 சுகாதார உதவிக்குறிப்புகள்",
    symptoms: "🏥 அறிகுறிகளை சரிபார்க்கவும்"
  }
};

type Props = {
  language: "en" | "hi" | "ta";
  setInputText: (text: string) => void;
  inputRef: any;
};

export default function QuickButtons({ language, setInputText, inputRef }: Props) {
  const t = buttonTranslations[language];

  const buttons = [
    { icon: Thermometer, text: t.fever, prompt: "What are fever and cough symptoms?" },
    { icon: Calendar, text: t.vaccine, prompt: "Tell me about vaccination schedule" },
    { icon: Heart, text: t.tips, prompt: "Give me health tips" },
    { icon: Stethoscope, text: t.symptoms, prompt: "Help me check my symptoms" }
  ];

  const handleClick = (prompt: string) => {
    setInputText(prompt);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "12px",
      marginBottom: "24px"
    }}>
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => handleClick(button.prompt)}
          className="quick-btn"
        >
          <button.icon style={{ width: "20px", height: "20px", color: "#3b82f6" }} />
          <span style={{ fontSize: "14px" }}>{button.text}</span>
        </button>
      ))}
    </div>
  );
}