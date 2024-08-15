import { test, expect } from '@playwright/test';

require('@/__e2e__/functions').configAdmin();

test.describe('sample', () => {
  test('private', async ({ page }) => {
    await page.goto('/');
    await page.waitForURL('/');
  });
});

/* おまけ
### ブラウザでXPath

```js
function xpath(selector) {
  var ite = document.evaluate(selector, document);
  return ite.iterateNext();
}
```

### スクショ

```js
await page.screenshot({ path: 'screenshot.png' });
await page.screenshot({ path: 'screenshot.png', fullPage: true });
```

### ブラウザを起動してテストする例（--headedオプション）

```bash
npx playwright test -c __e2e__ __e2e__/sample.spec.ts --headed
```

### UIモードでグラフィカルに実行

```bash
npx playwright test --project=IT --ui
```

### ブラウザの手動操作を記録してコードを自動生成する機能(codegen)

```bash
npx playwright codegen --load-storage __e2e__/.auth/admin.json http://localhost:3000
```

### テスト個別にタイムアウトを伸ばして実施する例

```js
test.setTimeout(1000000);
test.only('test', async ({ page }) => {
  await page.waitForTimeout(10000000);
});
```

### その他

- expectにawaitをつけないと--uiモードじゃない場合のヘッドレスモードでエラーになることがある
- mswが有効だとpage.routeによるモックが効かない。mock機能を外部のサーバに移せば解決。

```js
// https://github.com/mswjs/msw/issues/1644#issuecomment-1750722052
import { createMiddleware } from '@mswjs/http-middleware';
import express from 'express';
import cors from 'cors';
import { handlers } from './handlers';

const app = express();
const port = 9090;

app.use(cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200, credentials: true }));
app.use(express.json());
app.use(createMiddleware(...handlers));
app.listen(port, () => console.log(`Mock server is running on port: ${port}`));
```
*/
