export const getInitialLanguage = (req) => req.i18n.language;

export const getInitialState = (req) => {
  const {
    languages,
    services: {
      resourceStore: { data },
    }
  } = req.i18n;

  const initialState = languages.reduce((acc, lang) => {
    acc[lang] = data[lang];
    return acc;
  }, {});

  return initialState;
};
