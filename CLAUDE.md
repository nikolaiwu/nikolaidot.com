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

## Styles

- Global CSS lives in `src/styles/`. `main.css` is the single entry point, imported by `Base.astro`: `reset.css` (in the `reset` cascade layer, so any unlayered rule overrides it), `tokens.css`, `base.css`, `typography.css`, `layout.css`, `motion.css`. Component styles stay in scoped `<style>` blocks.
- `tokens.css` holds primitives (`--neutral-*`, `--blue-*`) and semantic tokens. Components use only the semantic ones: `--color-*`, `--font-*`, `--weight-display`, `--text-*`, `--leading-*`, `--space-*`, `--container-max`, `--gutter`, `--grid-*`, `--header-*`, `--sticky-top`.
- `--blue-500` is `#3555ed`, not a rounder value, so the accent passes 4.5:1 on the light background.
- Scoped styles: Astro scopes only the outer selector of a nested rule, so nest only same-element selectors (`&:hover`, `&::before`, `&.active`) and `@media`. Write descendant selectors flat (`.cta .body`), so each part gets the scope. Reaching into a child component takes `:global()`.
- A `class` passed to a component carries the parent's scope only when the component spreads `...rest` onto its root, as `Arrow` does. Otherwise style it with `:global()` from the parent.
- `body::before` and `body::after` lay a print grain over the whole page.
- Colors follow the system scheme through `color-scheme: light dark` and `light-dark()`. No theme toggle.
- Type sizes above `--text-sm` are fluid `clamp()` values, from 360px to 1280px viewports. Headings get their sizes in `typography.css`.
- `.container` centers content at `--container-max` with `--gutter` padding. Components apply it themselves: on the element when it has no full-width background, or on an inner wrapper when it does (the hero).
- `.grid` is a `--grid-columns` (12) column grid with a fluid `--grid-gap`. Children span all columns by default; components set `grid-column` to place them. It combines with `.container` on the same element.
- The header is sticky. Other sticky elements stick only from `64rem`, at `inset-block-start: var(--sticky-top)`: below the header plus the gap above it. `html` has the same `scroll-padding-block-start`. Stacking order: the header (`z-index: 2`) above sticky section titles (`1`) above content.

## Motion

- `motion.css` holds the scroll parallax. Add `.parallax` (in place when mid-screen) or `.parallax-top` (in place on load, for the first screen) and set `--depth`: positive moves faster than the page, negative lags. A kicker or title at the top of a page needs `.parallax-top`, or it loads already shifted.
- Parallax animates `translate`, so a parallax element can't set its own `translate`, and a sticky one should drop it (`animation: none`).
- Scroll-driven animations only. Without support, or under `prefers-reduced-motion: reduce`, nothing moves. Every transition has a reduced-motion fallback.
- Write scroll-driven animations as longhands (`animation-name`, `animation-timeline`, …), never the `animation` shorthand. The build's CSS minifier (Lightning CSS) folds `animation-timeline` into the shorthand, which browsers reject, dropping the whole declaration.

## Fonts

- Three families through the Astro Fonts API with the Fontsource provider, configured in `astro.config.mjs`. Static single weights, Latin and Cyrillic subsets, downloaded at build time and self-hosted from `/_astro/fonts/`:
  - Sofia Sans 400 and 700 (`--font-body`): body text.
  - Sofia Sans Extra Condensed 900 (`--font-display`, `--weight-display`): headings and display type.
  - Martian Mono 500 (`--font-mono`): labels, through `.label`.
- `Base.astro` renders a `<Font />` per family and preloads only Sofia Sans 400 and Extra Condensed 900, the above-the-fold faces. Preload only the subsets the locale uses: `latin` for English, `cyrillic` and `latin` for Bulgarian (its pages also contain Latin text, and preloading only Cyrillic caused a layout shift).
- Bulgarian text uses the `ss01` feature (`:lang(bg)` in `typography.css`).
- No `@fontsource` packages or hand-written `@font-face` rules.

## Pages and i18n

- English (`en`, default) is unprefixed and Bulgarian (`bg`) lives under `/bg/`, through Astro's i18n routing. No fallbacks.
- Page files are thin per-locale wrappers: `src/pages/about.astro` and `src/pages/bg/about.astro` both render `<About lang="…" />` from `src/views/`. Case study routes call `getWorkPaths(lang)` from `src/lib/work.ts`.
- Every page renders inside `src/layouts/Base.astro` (`<html lang>`, head, skip link, header, footer). Case studies use `src/layouts/CaseStudy.astro`.
- UI strings live in `src/i18n/ui.ts`; `bg` must have every key `en` has. Get them with `const t = useTranslations(lang)`.
- Build internal links with `getRelativeLocaleUrl(lang, path)` from `astro:i18n`, never by hand.
- The language switcher links to the same path in the other locale. Pass `translated={false}` to `Base` on pages without a translation; that also drops the `hreflang` alternates.
- `Base` renders `hreflang` alternates (each locale plus `x-default` → English), `og:locale` and `og:locale:alternate` (codes in `ogLocales` in `ui.ts`). Absolute URLs come from `site` in `astro.config.mjs`, a placeholder until the domain is set.
- Longer page copy is Markdown, one file per locale (About: `src/content/about/{en,bg}.md`).
- Contact details are in `src/data/contact.ts`, and the contact section is in the footer (`#contact`).
- `public/` holds only the public CV (`cv-…-p.pdf`, `-p` for public): no phone number and no personal email. Before committing a new one, check its text, links and metadata.

## Dot grid

- `DotGrid.astro` is a `<dot-grid>` custom element drawing on a decorative canvas (`aria-hidden`), absolutely positioned behind its parent's content (`z-index: -1`, so the parent needs `isolation: isolate`). It's used in the hero and in the homepage CTA, with the same settings so the two match.
- It only redraws in response to the pointer, while it's in view (`IntersectionObserver`) and the tab is visible. Under `prefers-reduced-motion: reduce` it draws one static frame and ignores the pointer.
- Device pixel ratio is capped at 2. Colors come from CSS tokens, resolved through `getComputedStyle` and re-read when the color scheme changes.
- Listeners share one `AbortController`, aborted in `disconnectedCallback`.
- Options beyond the pattern and hover:
  - `zones`: hotspots that light up under the pointer and fire `zonechange` (`detail.zone`, `-1` for none). The `zone` property reads the active zone and sets a selected one, as if hovered.
  - `zonePull`: an active zone's dots draw towards its centre.
  - `repel`: dots near the cursor are pushed away from it, as far as they're lifted.
  - `glyph`: a bitmap drawn centred in solid accent dots. `pixelText()` from `src/lib/pixel-font.ts` builds one from text; it holds only the letters in use, so add any new ones there.

## Hero

- The headline text stays the LCP element; the dot grid can't shift layout.
- The panel's tag reads out the pointer's position over the grid (`X`/`Y`, 00–99) and snaps to a zone's centre while one is lit.
- The figure is retitled (`ScrambleText`) and its chart morphs for each zone. Charts are cubic Béziers sharing one shape, so they blend number by number.
- The `✱` button steps through the zones for keyboard and touch users, through the grid's `zone` property. It's the only interactive element in the panel; the tag and figure are `aria-hidden`.
- The pill reads the page's load time from Navigation Timing (`loadEventEnd`) and fills before showing it.

## Footer

- The footer is a full-width inverted band with a `.container` inside. `Dither` dissolves the page into it along the top edge, and `DitherStairs` climbs the left margin from `100rem`. Both are generated at build time as one SVG path each (`src/lib/dither.ts`).
- The colophon lists what the site is built with as labelled icons. Its barcode is a scannable Code 128 (`Barcode` with `src/lib/code128.ts`) that reads `418 I'M A TEAPOT`. The box's padding is the barcode's quiet zone. On 1x screens the barcode snaps to whole pixels per module so it still scans.

## Components

- `PageHeader` opens every inner page: kicker, display title, intro slot. `Kicker` is the mono label above a title, and always uses `.parallax-top`.
- `SectionHead` is a section title with the striped rule and an optional `slot="action"`. `sticky` sticks it below the header (from `64rem`), with a rule drawn along its edge while stuck, through a `scroll-state` container query. Browsers without support skip the rule.
- `PillLink` is the pill-shaped link (`solid`, `arrow` direction). `Arrow` is the one arrow icon, rotated for `back` and `down`, sized with `--arrow-size` and `--arrow-stroke`. Arrows go only in interactive elements.
- `Icon` holds brand marks from Simple Icons (CC0) and line icons from Lucide (ISC). Without `label` it's decorative; with one it's announced and shows a tooltip.
- `ScrambleText` retypes its text through random glyphs (the `text` property), instantly under reduced motion.
- `WorkGrid` lays out work cards in alternating 7/5 and 5/7 rows; `WorkCard` and `SpecSheet` are the card and the spec-sheet aside.

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
