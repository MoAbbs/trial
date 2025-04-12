import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import backend from './plugins/backend'
import { i18nextPlugin } from 'translation-check'
import XHR from 'i18next-http-backend';
import trim from './plugins/trim_keys'

const resources = {
  en: {
    translation: {
    },
  },


};
// console.log(backend)
i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(i18nextPlugin)
    .use(trim)
    .use(XHR)
    // .use(backend)
    .init({
      resources,
      postProcess: ['Trimming'],
      saveMissing: true,
      lng: 'en',
      backend,
      // debug: true,
      keySeparator: false, // we do not use keys in form messages.welcome
      // debug: true,
      wait: true,
      react: {
        omitBoundRerender: false,
      },
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });

export default i18n;

