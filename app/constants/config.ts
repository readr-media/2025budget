const ENV = process.env.NEXT_PUBLIC_ENV
const BASE_JSON_URL = process.env.NEXT_PUBLIC_BASE_JSON_URL ?? ''
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

export { ENV, FIREBASE_CONFIG, BASE_JSON_URL }
