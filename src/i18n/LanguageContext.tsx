import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "./translations";

type Language = "tr" | "en";

interface LanguageContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.tr;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>("tr");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as Language;
    if (savedLang && (savedLang === "tr" || savedLang === "en")) {
      setLang(savedLang);
    } else {
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "tr") {
        setLang("tr");
      } else {
        setLang("tr"); // Default to Turkish as per local context, but customizable
      }
    }
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  const t = translations[lang] || translations.tr;

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLang must be used within a LanguageProvider");
  }
  return context;
};
