import { Lang, i18n } from 'Types/i18n';

export type Ii18n = {
  language: Lang;
  languages: Lang[];
  services: {
    resourceStore: {
      data: i18n;
    };
  };
};
