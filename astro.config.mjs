// @ts-check
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  i18n: {
    locales: ["en", "bg"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false },
  },
  // Static weights: one small file per weight and subset, only the ones in use.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Sofia Sans",
      cssVariable: "--font-sofia-sans",
      weights: [400, 700],
      styles: ["normal"],
      subsets: ["latin", "cyrillic"],
      fallbacks: ["sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Sofia Sans Extra Condensed",
      cssVariable: "--font-sofia-sans-extra-condensed",
      weights: [900],
      styles: ["normal"],
      subsets: ["latin", "cyrillic"],
      fallbacks: ["sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Martian Mono",
      cssVariable: "--font-martian-mono",
      weights: [500],
      styles: ["normal"],
      subsets: ["latin", "cyrillic"],
      fallbacks: ["monospace"],
    },
  ],
});
