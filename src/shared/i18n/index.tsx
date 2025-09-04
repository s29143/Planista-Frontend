import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
export const supportedLngs = ["pl", "en"] as const;
export const fallbackLng = "pl";

const defaultVariables = {
  pl: { field: "Pole", name: "Nazwa" },
  en: { field: "Field", name: "Name" },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(HttpBackend)
  .init({
    fallbackLng,
    supportedLngs: Array.from(supportedLngs),
    defaultNS: "common",
    ns: ["common"],
    detection: {
      order: ["querystring", "localStorage", "navigator"],
      lookupQuerystring: "lng",
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: true,
      defaultVariables: defaultVariables[fallbackLng],
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    react: { useSuspense: true },
    load: "languageOnly",
    nonExplicitSupportedLngs: true,
    debug: import.meta.env.DEV,
  });
i18n.on("languageChanged", (lng) => {
  const dv = defaultVariables[lng as keyof typeof defaultVariables] ?? {};
  i18n.options.interpolation = {
    ...(i18n.options.interpolation || {}),
    defaultVariables: dv,
  };
  i18n.services.interpolator.init(i18n.options.interpolation, true);
});

export default i18n;
