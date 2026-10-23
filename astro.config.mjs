// @ts-check
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
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
