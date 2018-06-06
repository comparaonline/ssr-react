export default (config) => {
  const {
    js,
    styles,
    cssHash,
    content,
    styleTags,
    reduxInitialState,
    apolloInitialState,
    i18nInitialState,
    i18nInitialLanguage,
  } = config;

  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>react-universal-component-boilerplate</title>
      ${styleTags}
      ${styles}
    </head>
    <body>
      <h1>AMP Template</h1>
      <div id="root">${content}</div>
      <script>
        window.__REDUX_STATE__ = ${JSON.stringify(reduxInitialState).replace(/</g, '\\u003c')};
        window.__APOLLO_STATE__ = ${JSON.stringify(apolloInitialState).replace(/</g, '\\u003c')};
        window.__I18N_STATE__ = ${JSON.stringify(i18nInitialState).replace(/</g, '\\u003c')};
        window.__I18N_LANGUAGE__ = ${JSON.stringify(i18nInitialLanguage).replace(/</g, '\\u003c')};
      </script>
      ${cssHash}
      ${js}
    </body>
  </html>`;
}
