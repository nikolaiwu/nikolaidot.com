import { base } from "../lib/base";
import { defaultLang, type Lang } from "./ui";

// The path without the base path and its locale prefix, shared by every locale.
export const getLocalePath = (pathname: string, lang: Lang) => {
  const path = pathname.slice(base.length);
  return lang === defaultLang ? path : path.slice(lang.length + 1);
};
