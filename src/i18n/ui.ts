export const languages = {
  en: "English",
  bg: "Български",
};

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "en";

const en = {
  "site.name": "Vuchkov.Studio",
  "site.description":
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
  "skip.link": "Skip to content",
  "nav.label": "Main",
  "nav.work": "Work",
  "nav.about": "About",
  "nav.contact": "Contact",
  "hero.title": "Front-end engineer building fast, considered interfaces.",
  "hero.text":
    "Seventeen years of turning designs into products people use every day: marketing sites, data-heavy dashboards and real-time platforms.",
  "hero.link": "See the work",
  "home.featured": "Selected work",
  "home.allWork": "All work",
  "home.contactTitle": "Lorem ipsum dolor sit amet?",
  "home.contactText":
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
  "home.contactLink": "Get in touch",
  "work.title": "Work",
  "work.intro":
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  "work.more": "More work",
  "work.archived": "Archived",
  "work.client": "Client",
  "work.role": "Role",
  "work.year": "Year",
  "work.stack": "Stack",
  "work.visit": "Visit site",
  "work.back": "All work",
  "about.title": "About",
  "about.cv": "Download CV (PDF)",
  "contact.title": "Contact",
  "contact.email": "Email",
  "contact.profiles": "Profiles",
  "notFound.title": "Page not found",
  "notFound.text":
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
  "notFound.home": "Back to the homepage",
};

const bg: typeof en = {
  "site.name": "Вучков.Студио",
  "site.description":
    "Лорем ипсум долор сит амет, консектетур адиписцинг елит, сед до еиусмод темпор.",
  "skip.link": "Към съдържанието",
  "nav.label": "Основна",
  "nav.work": "Проекти",
  "nav.about": "За мен",
  "nav.contact": "Контакт",
  "hero.title": "Фронтенд инженер, който създава бързи и обмислени интерфейси.",
  "hero.text":
    "Седемнадесет години превръщам дизайни в продукти, които хората използват всеки ден: маркетингови сайтове, дашборди с много данни и платформи в реално време.",
  "hero.link": "Вижте проектите",
  "home.featured": "Избрани проекти",
  "home.allWork": "Всички проекти",
  "home.contactTitle": "Лорем ипсум долор сит амет?",
  "home.contactText":
    "Ут еним ад миним вениам, куис ноструд екзерцитатион уламко лаборис ниси ут аликуип.",
  "home.contactLink": "Пишете ми",
  "work.title": "Проекти",
  "work.intro":
    "Дуис ауте ируре долор ин репрехендерит ин волуптате велит есе цилум долоре еу фугиат нула париатур.",
  "work.more": "Още проекти",
  "work.archived": "Архивиран",
  "work.client": "Клиент",
  "work.role": "Роля",
  "work.year": "Година",
  "work.stack": "Технологии",
  "work.visit": "Към сайта",
  "work.back": "Всички проекти",
  "about.title": "За мен",
  "about.cv": "Изтеглете CV (PDF, на английски)",
  "contact.title": "Контакт",
  "contact.email": "Имейл",
  "contact.profiles": "Профили",
  "notFound.title": "Страницата не е намерена",
  "notFound.text":
    "Ексцептеур синт окаекат купидатат нон проидент, сунт ин кулпа куи официа.",
  "notFound.home": "Към началната страница",
};

const ui = { en, bg };

export type UiKey = keyof typeof en;

export function useTranslations(lang: Lang) {
  return (key: UiKey) => ui[lang][key];
}
