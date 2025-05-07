import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en.json";
import zhTranslation from "./locales/zh.json";
import jaTranslation from "./locales/ja.json";

const resources = {
  en: { translation: enTranslation },
  zh: { translation: zhTranslation },
  ja: { translation: jaTranslation },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "zh", // 默认语言
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
