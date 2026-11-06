import { bg } from "./bg";
import { en } from "./en";

export const languages = {
  en: "English",
  bg: "Български",
};

export type Lang = keyof typeof languages;

export const locales = Object.keys(languages) as Lang[];

export const defaultLang: Lang = "en";

export const ogLocales: Record<Lang, string> = {
  en: "en_US",
  bg: "bg_BG",
};

const ui = { en, bg };

export type UiKey = keyof typeof en;

export function useTranslations(lang: Lang) {
  return (key: UiKey) => ui[lang][key];
}
