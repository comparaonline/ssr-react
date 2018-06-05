export default (config) => {
  const { js, styles, cssHash, content, styleTags, reduxInitialState } = config;

  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>react-universal-component-boilerplate</title>
      ${styleTags}
      ${styles}
    </head>
    <body>
      <h1>Default Template</h1>
      <div id="root">${content}</div>
      <script>
        window.__REDUX_STATE__ = ${JSON.stringify(reduxInitialState).replace(/</g, '\\u003c')}
      </script>
      ${cssHash}
      ${js}
    </body>
  </html>`;
}
