import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";

export const supportedLngs = ["pl", "en"] as const;
export const fallbackLng = "pl";

const defaultVariables = {
  pl: { field: "Pole", name: "Nazwa" },
  en: { field: "Field", name: "Name" },
};

i18n
  .use(LanguageDetector)
  .use(
    resourcesToBackend((lng: string, ns: string) => {
      if (ns === "common") {
        return import.meta.glob(
          `/src/shared/locales/${lng}/${ns}.json`,
           { eager: false }
        );
      }
      return import.meta.glob(
        `/src/features/${ns}/locales/${lng}/${ns}.json`,
         { eager: false }
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
    interpolation: {
      escapeValue: true,
      defaultVariables: defaultVariables[fallbackLng],
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
