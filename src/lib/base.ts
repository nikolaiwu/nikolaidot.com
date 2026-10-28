// The path the site is served from, without a trailing slash: "" at the root.
export const base = import.meta.env.BASE_URL.replace(/\/$/, "");

/** A file in `public/`, under the base path. */
export const publicUrl = (path: string) => `${base}/${path}`;
