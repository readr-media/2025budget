# 2025budget

## 在 Local 啟動

1. 環境設定
首先，請設定環境變數，建立 `.env.local` 檔案，內容如下：

```
NEXT_PUBLIC_ENV=dev
NEXT_PUBLIC_DOMAIN=http://localhost:3000
NEXT_PUBLIC_GCS_BUCKET_PATH=""
```

2. 安裝相依套件
```
yarn install
```

3. 啟動開發環境
根據 package.json 的 設定，啟動開發環境
```
yarn dev
```
這會使用 Next.js 的 turbo mode 啟動開發環境。

4. 存取 local 畫面
在瀏覽器中開啟：
```
http://localhost:3000
```