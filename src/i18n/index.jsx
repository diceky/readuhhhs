import { createContext, useContext, useEffect, useState } from "react";
import { ja } from "./ja";
import { en } from "./en";

const dicts = { ja, en };
const LangContext = createContext({ lang: "ja", setLang: () => {}, t: ja });

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = window.localStorage.getItem("readuhhhs-lang");
    if (saved && dicts[saved]) return saved;
    return "ja";
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem("readuhhhs-lang", lang);
  }, [lang]);

  const t = dicts[lang] ?? ja;
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
