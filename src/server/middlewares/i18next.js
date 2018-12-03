import i18n from 'i18next';
import path from 'path';
import fs from 'fs';
import i18nMiddleware, { LanguageDetector } from 'i18next-express-middleware';
import i18nextBackend from 'i18next-node-fs-backend';
import find from 'lodash.find';
import { get as getConfig } from '../../../config';
import { ROOT_PATH } from '../../utils/EnvInfo';

const langConfig = getConfig('i18n.languages');
const commonConfig = getConfig('i18n.config');
const i18nPath = path.join(ROOT_PATH, getConfig('i18n.rootPath'));
const fallbackPath = path.join(ROOT_PATH, getConfig('i18n.fallbackPath'));
const defaultLang = find(langConfig, { default: true });
const langDetector = new LanguageDetector();

const langPath = fs.existsSync(i18nPath) ? i18nPath : fallbackPath;

langDetector.addDetector({
  name: 'CustomLanguageDetector',
  lookup(req) {
    const host = req.get('host');
    const _langConfig = find(langConfig, lang => (
      host.includes(lang.domain)
    )) || defaultLang;

    return _langConfig.locale;
  },
  cacheUserLanguage(req, res, lng) {
    Object.assign(req, { locals: { lng } });
  },
});


const serverConfig = Object.assign({}, commonConfig, {
  preload: langConfig.map(lang => lang.locale),
  backend: {
    loadPath: `${langPath}/{{lng}}/{{ns}}.json`,
  },
  detection: {
    order: ['CustomLanguageDetector'],
  },
});


const i18nextInit = new Promise((resolve, reject) => {
  i18n
    .use(i18nextBackend)
    .use(langDetector)
    .init(serverConfig, (err) => {
      if (err) {
        reject(err);
      }

      resolve(i18nMiddleware.handle(i18n));
    });
});

export default i18nextInit;
