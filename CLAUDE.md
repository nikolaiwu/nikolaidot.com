# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site for Nikolai Vuchkov, senior front-end engineer. The source is part of the work: keep the CSS and components clean and idiomatic.

The full plan (site map, content model, design decisions, build phases, open decisions) is in `PLAN.local.md`, which is gitignored via `*.local.md`. Read it before planning new work, and check off items there as phases complete.

This file documents only what is implemented. When a feature lands, add its conventions here; until then they live in the plan.

## Public repo

This repository is public. Anything committed is published, and git history is permanent: deleting a file or making the repo private later doesn't undo that. Private notes (audience, positioning, client and project details) go in `PLAN.local.md`, never in tracked files, code comments or commit messages.

Before any commit, check for and flag:

- **Format, build and check.** Run `pnpm format`, `pnpm build` and `pnpm astro check`, and fix anything they report.
- **Local and draft files.** `*.local.md` and `drafts/` are gitignored and must stay out. Run `git status` before the first commit and after changing `.gitignore`.
- **Secrets.** No `.env` files, API keys or tokens. Analytics site IDs are fine.
- **Personal data.** Commits use the GitHub noreply email, not a personal address. Nothing from the private list in `PLAN.local.md`.
- **Commit messages.** Follow the conventions below.

## Commits

Messages follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

- **Types:** `feat` (new feature), `fix` (bug fix), `docs`, `style` (formatting, no code change), `refactor`, `perf`, `test`, `build` (build system, dependencies), `ci`, `chore` (tooling, config, housekeeping).
- **Scope** is optional and names the area: `feat(hero): …`, `fix(i18n): …`, `docs(readme): …`.
- **Description:** imperative, lowercase, no trailing period, about 50 characters (`add work collection schema`, not `Added schema.`).
- **Body:** optional, after a blank line. Explain what and why, not how.
- **Breaking changes:** `!` before the colon (`feat(content)!: …`) or a `BREAKING CHANGE:` footer.
- One logical change per commit. No "wip", "fix stuff" or "updates".
- No AI attribution: no `Co-Authored-By` trailers in commits and no "Generated with" lines in pull requests.

## Code style

- Comments are minimal and to the point throughout the code.

## Fonts

- Manrope (variable, 200–800, no italic) through the Astro Fonts API with the Fontsource provider, configured in `astro.config.mjs`. Files are downloaded at build time and self-hosted from `/_astro/fonts/`.
- Exposed as `--font-manrope`. Render `<Font cssVariable="--font-manrope" />` in the page `<head>` and preload only the subset the locale uses (`preload={[{ subset: "latin" }]}` for English).
- No `@fontsource` packages or hand-written `@font-face` rules.

## Pages and i18n

- English (`en`, default) is unprefixed and Bulgarian (`bg`) lives under `/bg/`, through Astro's i18n routing. No fallbacks.
- Page files are thin per-locale wrappers: `src/pages/about.astro` and `src/pages/bg/about.astro` both render `<About lang="…" />` from `src/views/`. Case study routes call `getWorkPaths(lang)` from `src/lib/work.ts`.
- Every page renders inside `src/layouts/Base.astro` (`<html lang>`, head, skip link, header, footer). Case studies use `src/layouts/CaseStudy.astro`.
- UI strings live in `src/i18n/ui.ts`; `bg` must have every key `en` has. Get them with `const t = useTranslations(lang)`.
- Build internal links with `getRelativeLocaleUrl(lang, path)` from `astro:i18n`, never by hand.
- The language switcher links to the same path in the other locale. Pass `translated={false}` to `Base` on pages without a translation.
- Longer page copy is Markdown, one file per locale (About: `src/content/about/{en,bg}.md`).
- Contact details are in `src/data/contact.ts`, and the contact section is in the footer (`#contact`).
- `public/` holds only the public CV (`cv-…-p.pdf`): no phone number and no personal email. Before committing a new one, check its text, links and metadata.

## Case studies

- The `work` collection is defined in `src/content.config.ts` (glob loader, `.md`/`.mdx`). Entries live in `src/content/work/en/` and `src/content/work/bg/`; the same filename is the same case study in both languages, and entry ids are `en/<slug>` / `bg/<slug>`. Locale comes from the folder, not frontmatter.
- Translated entries repeat every frontmatter field; only `title`, `role`, `summary` and the body change.
- Archived entries (`status: archived`) have no `url`.
- The current entries are Lorem Ipsum placeholders (Cyrillic pseudo-Latin text in `bg/`) with SVG images from `src/assets/placeholders/`. They exist to style against and get replaced by real case studies.
- Work in progress lives in `drafts/` (or as `*.local.md`). A case study moves into `src/content/` and is committed only when it's finished and passes the content rules in `PLAN.local.md`.
- When writing or editing a case study, check it against those rules and flag anything that crosses a line. When unsure, anonymise.

## License

Code is MIT: `LICENSE` holds the plain MIT text only, so GitHub detects it. Writing, images and other media are all rights reserved, stated in the README's License section.

## Commands

pnpm is the package manager. Node >= 22.23.4.

```sh
pnpm install
pnpm build         # static build to dist/
pnpm preview       # serve the built site
pnpm format        # prettier --write .
pnpm format:check  # prettier --check .
pnpm astro check   # type-check .astro and .ts files
```

There is no test runner. TypeScript stays on 6.x until `@astrojs/check` supports 7.

Don't format, build or type-check after every change. Run them only before a commit (see "Public repo").

Start the dev server in background mode, and manage it with the matching subcommands:

```sh
pnpm astro dev --background   # http://localhost:4321
pnpm astro dev status
pnpm astro dev logs
pnpm astro dev stop
```

`pnpm-workspace.yaml` has a `minimumReleaseAgeExclude` list. pnpm may refuse to install very recently published package versions; if it does, pick an older version rather than adding to the exclude list without asking.

## Astro docs

This is **Astro 7**. Follow current docs at https://docs.astro.build, not older Astro 5 examples. Consult the relevant guide before working on:

- [Routing, dynamic routes, middleware](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Framework components (React islands)](https://docs.astro.build/en/guides/framework-components/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Styling](https://docs.astro.build/en/guides/styling/)
- [Fonts](https://docs.astro.build/en/guides/fonts/)
- [Internationalization](https://docs.astro.build/en/guides/internationalization/)

Content schemas import `z` from `astro/zod` (Zod 4, bundled with Astro). Importing `z` from `astro:content` is deprecated.
