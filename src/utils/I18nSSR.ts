import { Request } from 'Types/express';
import { i18n, Lang } from 'Types/i18n';
import { Ii18n } from '../server/middlewares/i18next';

export const getInitialLanguage = (req: Request): Ii18n['language'] => req.i18n.language;

export const getInitialState = (req: Request): Partial<i18n> => {
  const {
    languages,
    services: {
      resourceStore: { data },
    },
  } = req.i18n;

  const initialState: Partial<i18n> = languages.reduce((acc: Partial<i18n>, lang: Lang) => {
    acc[lang] = data[lang];
    return acc;
  }, {});

  return initialState;
};
