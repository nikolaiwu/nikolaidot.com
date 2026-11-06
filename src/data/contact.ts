export const email = "vuchkov@nikolaidot.com";

export const mailto = (subject: string) =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}`;

export const profiles = [
  { name: "GitHub", url: "https://github.com/nikolaiwu", icon: "github" },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/nikolai-vuchkov-702bab49",
    icon: "linkedin",
  },
] as const;
