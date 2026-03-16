"use client";

import { Languages } from "lucide-react";

type Props = {
  language: "en" | "hi" | "ta";
  setLanguage: (lang: "en" | "hi" | "ta") => void;
};

export default function LanguageSelector({ language, setLanguage }: Props) {
  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "ta", name: "தமிழ்", flag: "🏴" }
  ];

  return (
    <div style={{ position: "relative" }}>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as "en" | "hi" | "ta")}
        style={{
          appearance: "none",
          background: "rgba(255,255,255,0.2)",
          color: "white",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: "8px",
          padding: "8px 32px 8px 16px",
          fontSize: "14px",
          cursor: "pointer"
        }}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} style={{ color: "#1f2937" }}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
      <Languages style={{
        position: "absolute",
        right: "8px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "16px",
        height: "16px",
        color: "white",
        pointerEvents: "none"
      }} />
    </div>
  );
}