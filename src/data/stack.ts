import type { useTranslations } from "../i18n/ui";

type T = ReturnType<typeof useTranslations>;

// Grouped as in the CV. Icon names are keys in Icon.astro.
export const getStack = (t: T) =>
  [
    {
      title: t("stack.languages"),
      items: [
        { icon: "javascript", label: "JavaScript" },
        { icon: "typescript", label: "TypeScript" },
        { icon: "react", label: "React" },
        { icon: "nextjs", label: "Next.js" },
        { icon: "astro", label: "Astro" },
        { icon: "vue", label: "Vue.js" },
        { icon: "nuxt", label: "Nuxt" },
        { icon: "angular", label: "Angular" },
        { icon: "nodejs", label: "Node.js" },
      ],
    },
    {
      title: t("stack.styling"),
      items: [
        { icon: "html", label: "HTML" },
        { icon: "css", label: "CSS" },
        { icon: "sass", label: "Sass" },
        { icon: "tailwind", label: "Tailwind CSS" },
        { icon: "bootstrap", label: "Bootstrap" },
        { icon: "storybook", label: "Storybook" },
        { icon: "component", label: t("stack.designSystems") },
        { icon: "accessibility", label: t("stack.accessibility") },
        { icon: "responsive", label: t("stack.responsive") },
      ],
    },
    {
      title: t("stack.practices"),
      items: [
        { icon: "codeReview", label: t("stack.codeReview") },
        { icon: "git", label: "Git" },
        { icon: "infinity", label: "CI/CD" },
        { icon: "testing", label: t("stack.testing") },
        { icon: "server", label: "SSR/SSG" },
        { icon: "search", label: "SEO" },
      ],
    },
    {
      title: t("stack.tools"),
      items: [
        { icon: "figma", label: "Figma" },
        { icon: "wordpress", label: "WordPress" },
        { icon: "webhook", label: t("stack.rest") },
        { icon: "linux", label: "Unix/Linux" },
      ],
    },
    {
      title: t("stack.ai"),
      items: [
        { icon: "claude", label: "Claude" },
        { icon: "copilot", label: "GitHub Copilot" },
        { icon: "cursor", label: "Cursor" },
      ],
    },
  ] as const;
