import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

import en from "./locales/en.json"
import hi from "./locales/hi.json"

const translations = {
    en,
    hi,
};

export const i18n = new I18n(translations);

// Set default language to device language or fallback to English
i18n.locale = getLocales()[0]?.languageCode ?? "en";

// Enable fallback: if a translation is missing in the current language, use another
i18n.enableFallback = true;
