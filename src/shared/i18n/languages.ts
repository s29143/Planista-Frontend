import i18n from "./index";
export const languages = [
  { code: "pl", label: "Polski", dir: "ltr" },
  { code: "en", label: "English", dir: "ltr" }
] as const;

export function setLanguage(code: string) {
  const def = languages.find(l => l.code === code);
  i18n.changeLanguage(code);
  document.documentElement.setAttribute("lang", code);
  document.documentElement.setAttribute("dir", def?.dir ?? "ltr");
}
