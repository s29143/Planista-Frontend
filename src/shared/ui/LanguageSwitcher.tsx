import { Select } from "@mantine/core";
import i18n from "@/shared/i18n";
import { languages, setLanguage } from "@/shared/i18n/languages";

export function LanguageSwitcher() {
  return (
    <Select
      value={i18n.language}
      onChange={(v) => v && setLanguage(v)}
      data={languages.map((l) => ({ value: l.code, label: l.label }))}
      size="xs"
      aria-label="Language"
    />
  );
}
