# Finance SSC 靜態展示

以純 HTML、CSS 與 Vanilla JavaScript 製作，可直接部署至 GitHub Pages。使用者可切換 Employee／Finance 角色。所有身分、申請與財務數據皆為虛構示範資料；沒有後端、SSO 或 API。

## 開啟方式

直接開啟 `index.html`，或在本目錄執行：

```powershell
python -m http.server 8765
```

瀏覽 `http://127.0.0.1:8765/?role=employee` 或 `http://127.0.0.1:8765/?role=finance`。角色切換會更新 URL，並儲存於瀏覽器的 `localStorage`。頁面以 `page` 查詢參數切換，例如 `?role=employee&page=policy`。

示範申請僅保存在目前瀏覽器。要重設資料，可清除網站的本機儲存空間。

## 語言

首次開啟時依 `navigator.languages`（若不可用則依 `navigator.language`）選擇繁體中文、简体中文或 English；其他語言預設 English。側邊欄的「個人設定」可立即切換語言。手動選擇儲存在 `localStorage` 的 `fin-ssc-demo-locale`（`zh-TW`、`zh-CN` 或 `en`）；選擇 Auto 會刪除該 key 並重新偵測瀏覽器語言。語言與角色、頁面 URL 各自獨立。

頁面載入 `styles.css`、`messages.js`、`simplified.js`、`i18n.js` 與 `app.js`。翻譯集中於 `messages.js`，locale resolution 與 `t(key)` 位於 `i18n.js`。`simplified.js` 是靜態繁簡字形對照，無需執行時依賴或安裝套件。缺少翻譯時依目前語言、English、key 的順序 fallback。

## 檢查

```powershell
node --check app.js
node --check i18n.js
node --check messages.js
node --check simplified.js
node tools/verify.mjs
node tools/verify-i18n.mjs
```

畫面依既有 Finance SSC UI 參考圖重建，桌面視覺基準為 1672 × 941。參考圖片不作為整頁背景；版型由 HTML 與 CSS 重建。
