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
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Manrope",
      cssVariable: "--font-manrope",
      weights: ["200 800"],
      styles: ["normal"],
      subsets: ["latin", "cyrillic"],
      fallbacks: ["sans-serif"],
    },
  ],
});
