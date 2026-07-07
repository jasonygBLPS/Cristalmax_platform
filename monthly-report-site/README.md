# 特定電力供應業公開資訊網站模板

這是一個純靜態網站模板，用來公開發布「供售電量月報 PDF」，設計給 Cloudflare Pages 直接部署，不需要伺服器或資料庫。

## 資料夾結構

```
monthly-report-site/
├── index.html          ← 主頁面（不需要修改）
├── data/
│   └── reports.json     ← 【你唯一需要維護的檔案】報表清單
├── reports/
│   ├── 2024/             ← 2024 年的 PDF 檔案放這裡
│   └── 2025/             ← 2025 年的 PDF 檔案放這裡
└── assets/
    ├── style.css
    └── app.js
```

## 日常更新流程（之後每個月要做的事）

1. 把新的月報 PDF 放進對應年度資料夾，例如 `reports/2025/2025-03.pdf`
2. 打開 `data/reports.json`，在對應年度的 `reports` 陣列裡新增一筆：

   ```json
   { "month": 3, "title": "2025年3月 供售電量月報", "file": "reports/2025/2025-03.pdf" }
   ```

3. 存檔、上傳到 GitHub（或用 Cloudflare Pages 直接上傳）
4. Cloudflare Pages 會自動偵測變更並重新部署，通常 30 秒內完成

**不需要修改 HTML、CSS 或 JS**，全部靠 `reports.json` 驅動畫面。

如果遇到新的年度（例如 2026 年），只要：
1. 新增 `reports/2026/` 資料夾
2. 在 `reports.json` 的 `years` 陣列最上面新增一個年度區塊

## 修改公司名稱 / 標題

打開 `data/reports.json` 最上方兩個欄位即可：

```json
"companyName": "你的公司名稱",
"pageTitle": "特定電力供應業公開資訊",
```

---

## 部署到 Cloudflare Pages 完整流程

### Step 1：註冊帳號
- [Cloudflare](https://cloudflare.com) 註冊帳號（免費）
- [GitHub](https://github.com) 註冊帳號（如果還沒有）

### Step 2：把這個模板上傳到 GitHub
1. 到 GitHub 建立一個新的 Repository（例如 `power-supplier-disclosure`），Public 或 Private 都可以
2. 把整個 `monthly-report-site/` 資料夾內容（不含最外層資料夾本身）上傳上去
   - 最簡單方式：GitHub 網頁介面 → "Add file" → "Upload files"，把所有檔案和資料夾拖進去
3. 記得把真實的財報 PDF 放進對應的 `reports/2024/`、`reports/2025/` 資料夾裡，並更新 `reports.json`

### Step 3：連接 Cloudflare Pages
1. 登入 Cloudflare 後台 → 左側「Workers & Pages」
2. 「建立應用程式」→「Pages」→「連接到 Git」
3. 授權 GitHub，選擇你剛建立的 repository
4. 建置設定：
   - Framework preset：**None**
   - Build command：留空
   - Build output directory：`/`
5. 點「儲存並部署」

大約 30–60 秒後，Cloudflare 會給你一個網址：

```
https://power-supplier-disclosure-xxx.pages.dev
```

### Step 4（建議）：綁定自訂網域
如果你有自己的網域（例如公司網域），可以在 Cloudflare Pages 專案的「自訂網域」頁籤直接綁定，例如：

```
disclosure.yourcompany.com.tw
```

Cloudflare 會自動配好 HTTPS 憑證，不用額外設定。

### Step 5：之後更新
每次你把新的 PDF + 更新後的 `reports.json` push 到 GitHub，Cloudflare Pages 會自動重新部署，全程不需要手動操作。

---

## 之後可能會用到的優化

| 需求 | 做法 |
|---|---|
| PDF 檔案很大（單檔 > 25MB） | 改用 Cloudflare R2 儲存 PDF，`reports.json` 裡的 `file` 改成 R2 的公開連結 |
| 想要依年度分頁籤而不是全部展開 | 可以在 `app.js` 加入 tab 切換邏輯（可以再請我幫忙加） |
| 想要用中文網址路徑或多語言版本 | 可以擴充 `reports.json` 結構，之後再調整 |
