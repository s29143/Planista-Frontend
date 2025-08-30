import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";

export const supportedLngs = ["pl", "en"] as const;
export const fallbackLng = "pl";

i18n
  .use(LanguageDetector)
  .use(
    resourcesToBackend((lng: string, ns: string) => {
      if (ns === "common") {
        return import(
          /* @vite-ignore */ `/src/shared/locales/${lng}/${ns}.json`
        );
      }
      return import(
        /* @vite-ignore */ `/src/features/${ns}/locales/${lng}/${ns}.json`
      );
    })
  )
  .use(initReactI18next)
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
    interpolation: { escapeValue: false },
    react: { useSuspense: true },
    load: "languageOnly",
    nonExplicitSupportedLngs: true,
    debug: import.meta.env.DEV,
  });

export default i18n;
