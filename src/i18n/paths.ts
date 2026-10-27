import { defaultLang, type Lang } from "./ui";

// The path without its locale prefix, shared by every locale.
export const getLocalePath = (pathname: string, lang: Lang) =>
  lang === defaultLang ? pathname : pathname.slice(lang.length + 1);
