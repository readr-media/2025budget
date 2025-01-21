const ENV = process.env.NEXT_PUBLIC_ENV
const SITE_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN ?? ''
const SITE_PATH = process.env.NEXT_PUBLIC_GCS_BUCKET_PATH ?? ''

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyAzFpnoOmD13ZEqIfdh5_tm2Q3fCP-chK0',
  authDomain: 'read-projects-prod.firebaseapp.com',
  databaseURL: 'https://read-projects-prod-default-rtdb.firebaseio.com',
  projectId: 'read-projects-prod',
  storageBucket: 'read-projects-prod.firebasestorage.app',
  messagingSenderId: '972295576824',
  appId: '1:972295576824:web:9169390572cb77f8a32f0d',
  measurementId: 'G-ETPMFJKSJR',
}
const LATEST_NEWS_JSON_URL =
  'https://raw.githubusercontent.com/readr-data/2025_budget/refs/heads/main/update.json'

const SITE_TITLE = '【持續更新】READr 中央政府總預算案審查監督平台'
const SITE_DESCRIPTION =
  '在READr Mesh 114 年中央政府總預算案審查，立委提出哪些刪減和建議？透過「隨機」和「分類」模式一目暸然。'
const SITE_URL = SITE_DOMAIN && SITE_PATH ? `${SITE_DOMAIN}/${SITE_PATH}` : ''
const SITE_OG_IMAGE = `${SITE_URL}/og.jpg`

const GA4_IDS = {
  dev: 'G-36HYH6NF6P',
  prod: 'G-341XFN0675',
}

const GA4_ID = ENV === 'prod' ? GA4_IDS.prod : GA4_IDS.dev

export {
  ENV,
  FIREBASE_CONFIG,
  LATEST_NEWS_JSON_URL,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_URL,
  SITE_PATH,
  SITE_OG_IMAGE,
  GA4_ID,
}
