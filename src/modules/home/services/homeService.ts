import { db } from '@/plugins/firebase'
import type { TextType } from '@/shared/types/TextType'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'

const collectionRef = collection(db, 'Home')

export async function GetHomeDescription(): Promise<TextType | null> {
  const docRef = doc(collectionRef, 'Description')
  const snapshot = await getDoc(docRef)

  if (!snapshot.exists()) {
    return null
  }

  return snapshot.data() as TextType
}

export async function SetHomeDescription(data: TextType) {
  const docRef = doc(collectionRef, data.id) // Usa el ID del objeto
  return await setDoc(docRef, data, { merge: true })
}

export async function setHomeTitle(data: TextType) {
  const docRef = doc(collectionRef, data.id)
  return await setDoc(docRef, data, { merge: true })
}

export async function getHomeTitle(): Promise<TextType | null> {
  const docRef = doc(collectionRef, 'Title')
  const snapshot = await getDoc(docRef)

  if (!snapshot.exists()) {
    return null
  }

  return snapshot.data() as TextType
}
