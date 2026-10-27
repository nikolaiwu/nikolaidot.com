import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "../i18n/ui";

export type WorkEntry = CollectionEntry<"work">;

// Entry ids are `<lang>/<slug>`.
export const getSlug = (entry: WorkEntry) =>
  entry.id.slice(entry.id.indexOf("/") + 1);

export async function getWork(lang: Lang) {
  const entries = await getCollection("work", ({ id }) =>
    id.startsWith(`${lang}/`),
  );
  return entries.sort(
    (a, b) => a.data.order - b.data.order || b.data.year - a.data.year,
  );
}

export async function getWorkPaths(lang: Lang) {
  const entries = await getWork(lang);
  const slugs = new Set(
    (await getCollection("work"))
      .filter(({ id }) => !id.startsWith(`${lang}/`))
      .map(getSlug),
  );

  return entries.map((entry) => ({
    params: { slug: getSlug(entry) },
    props: { entry, translated: slugs.has(getSlug(entry)) },
  }));
}
