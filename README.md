# Finance SSC 靜態展示

以純 HTML、CSS 與 JavaScript 製作，可直接部署至 GitHub Pages。所有身分、申請與財務數據皆為虛構示範資料；沒有後端、SSO 或 API。

## 開啟方式

直接開啟 `index.html`，或在本目錄執行：

```powershell
python -m http.server 8765
```

瀏覽 `http://127.0.0.1:8765/?role=employee` 或 `http://127.0.0.1:8765/?role=finance`。角色切換會更新 URL，並儲存於瀏覽器的 `localStorage`。頁面以 `page` 查詢參數切換，例如 `?role=employee&page=policy`。

示範申請僅保存在目前瀏覽器。要重設資料，可清除網站的本機儲存空間。

## 檢查

```powershell
Get-ChildItem app-*.js | ForEach-Object { node --check $_.FullName }
node tools/verify.mjs
```

畫面依既有 Finance SSC UI 參考圖重建，桌面視覺基準為 1672 × 941。參考圖片不作為整頁背景；版型由 HTML 與 CSS 重建。
