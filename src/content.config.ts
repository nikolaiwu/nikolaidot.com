import { existsSync } from "node:fs";
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Real case studies live outside this repo, in CONTENT_DIR. Without it, the placeholders build.
const workBase = process.env.CONTENT_DIR
  ? `${process.env.CONTENT_DIR}/work`
  : "./src/content/work";

if (!existsSync(workBase)) {
  throw new Error(`No case studies at ${workBase}`);
}

const work = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: workBase }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string(),
      role: z.string(),
      year: z.number(),
      stack: z.array(z.string()),
      // One sentence, used for cards and meta
      summary: z.string(),
      cover: image(),
      status: z.enum(["live", "archived"]),
      // Omit for archived projects
      url: z.url().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(99),
    }),
});

export const collections = { work };
