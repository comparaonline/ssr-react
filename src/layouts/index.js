export default (config) => {
  const { js, styles, cssHash, content } = config;

  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>react-universal-component-boilerplate</title>
      ${styles}
    </head>
    <body>
      <div id="root">${content}</div>
      ${cssHash}
      ${js}
    </body>
  </html>`;
}