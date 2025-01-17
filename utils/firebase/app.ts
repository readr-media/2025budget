import { initializeApp, getApp } from 'firebase/app'
import { FIREBASE_CONFIG } from '@/constants/config'
import { getFirestore } from 'firebase/firestore'

export const setup = () => {
  if (getApp.length) {
    return getApp()
  } else {
    return initializeApp(FIREBASE_CONFIG)
  }
}
const firebaseApp = setup()
export const db = getFirestore(firebaseApp)
