import { defineRouting } from "next-intl/routing";

export const locales = ["en", "de", "es", "fr", "zh"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  es: "Español",
  fr: "Français",
  zh: "中文",
};

export const localeShortNames: Record<Locale, string> = {
  en: "EN",
  de: "DE",
  es: "ES",
  fr: "FR",
  zh: "中文",
};

export const ogLocales: Record<Locale, string> = {
  en: "en_US",
  de: "de_DE",
  es: "es_ES",
  fr: "fr_FR",
  zh: "zh_CN",
};
