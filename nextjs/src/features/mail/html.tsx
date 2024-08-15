import { ReactElement } from 'react';
// https://github.com/vercel/next.js/issues/43810
const ReactDOMServer = require('react-dom/server');

// https://www.emmanuelgautier.com/blog/react-element-render-to-string
export function compToHtmlStr(component: ReactElement) {
  const htmlStr = ReactDOMServer.renderToString(component);

  return htmlStr;
}

/* NOTE: HTML mailでtailwindを使いたい場合
import { Tailwind } from '@react-email/tailwind';
import config from '@/tailwind.config';
<body>
  <Tailwind config={config}>{children}</Tailwind>
</body>
*/
export function buildHtmlMailStr(children: React.ReactNode) {
  const htmlComponent = (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <title>title</title>
      </head>
      <body>{children}</body>
    </html>
  );

  const htmlStr = compToHtmlStr(htmlComponent);

  return `<!DOCTYPE html>${htmlStr}`;
}
