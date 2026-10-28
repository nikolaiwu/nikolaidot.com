// @ts-check
import { defineConfig, envField, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // Overridden by the GitHub Pages preview build, served from a subfolder.
  site: process.env.SITE_URL ?? "https://example.com",
  base: process.env.SITE_BASE,
  env: {
    schema: {
      // Keeps preview builds out of search engines.
      NOINDEX: envField.boolean({
        context: "server",
        access: "public",
        default: false,
      }),
    },
  },
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
