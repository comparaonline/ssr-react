export default (config) => {
  const {
    js,
    helmet,
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
  <html ${helmet.htmlAttributes.toString()}>
    <head>
      <meta charset="utf-8">
      <title>react-universal-component-boilerplate</title>
      ${styleTags}
      ${styles}

      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
    </head>
    <body ${helmet.bodyAttributes.toString()}>
      <h1>Default Template</h1>
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
