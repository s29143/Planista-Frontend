import { Button, Group } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { languages } from "@/shared/i18n/languages";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage || i18n.language;

  const change = async (lng: string) => {
    if (lng !== current) {
      await i18n.changeLanguage(lng);
      localStorage.setItem("lng", lng);
    }
  };

  return (
    <Group gap="xs">
      {languages.map((l) => (
        <Button
          key={l.code}
          size="xs"
          variant={current === l.code ? "filled" : "light"}
          onClick={() => change(l.code)}
        >
          {l.label}
        </Button>
      ))}
    </Group>
  );
}
