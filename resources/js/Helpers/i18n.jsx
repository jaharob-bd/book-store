import i18n from 'i18next';
import {
    initReactI18next
} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { resources} from '../Api/Localize'

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        supportedLngs: ['en', 'ar', 'ms', 'fr', 'de', 'es', 'tr', 'hi', 'mol'],
        fallbackLng: 'en',
        debug: true,
        // backend: {
        //   loadPath: 'http://localhost:5000/languages'
        // },
        react: {
            useSuspense: false
        }
    });
console.log(i18n);

export default i18n;