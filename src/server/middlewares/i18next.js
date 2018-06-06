import i18n from 'i18next';
import path from 'path';
import i18nMiddleware, { LanguageDetector } from 'i18next-express-middleware';
import i18nextBackend from 'i18next-node-fs-backend';
import { find } from 'lodash';
import { get as getConfig} from '../../../config';

const langConfig = getConfig('i18n.languages');
const defaultLang = find(langConfig, { default: true });
const langDetector = new LanguageDetector();

langDetector.addDetector({
  name: 'CustomLanguageDetector',
  lookup(req) {
    const host = req.get('host');
    const _langConfig = find(langConfig, (lang) => {
      return host.includes(lang.domain);
    }) || defaultLang;

    return _langConfig.locale;
  },
  cacheUserLanguage(req, res, lng) {
    Object.assign(req, { locals: { lng } });
  },
});


const commonConfig = {
  fallbackLng: defaultLang.locale,
  keySeparator: ':',
  nsSeparator: '.',
};


const serverConfig = Object.assign({}, commonConfig, {
  preload: langConfig.map(lang => lang.locale),
  backend: {
    loadPath: `${path.join(__dirname, '../../i18n')}/{{lng}}/{{ns}}.json`,
  },
  detection: {
    order: ['CustomLanguageDetector']
  },
});


const i18nextInit = new Promise((resolve, reject) => {
  i18n
    .use(i18nextBackend)
    .use(langDetector)
    .init(serverConfig, (err) => {
      if (err) {
        reject(err);
      };

      resolve(i18nMiddleware.handle(i18n));
    });
});

export default i18nextInit;
