import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore'
import type { TextType } from '@/shared/types/TextType'
import { db } from '@/plugins/firebase'

const collectionRef = collection(db, 'Contact')

export const contactService = {
  async get(): Promise<TextType | null> {
    const snapshot = await getDocs(collectionRef)
    const docSnap = snapshot.docs[0]
    if (!docSnap) return null
    return {
      id: docSnap.id,
      ...(docSnap.data() as Omit<TextType, 'id'>),
    }
  },

  async add(text: Omit<TextType, 'id'>): Promise<string> {
    const docRef = await addDoc(collectionRef, text)
    return docRef.id
  },

  async update(id: string, text: Partial<Omit<TextType, 'id'>>): Promise<void> {
    const docRef = doc(collectionRef, id)
    await updateDoc(docRef, text)
  },

  async set(id: string, text: Partial<Omit<TextType, 'id'>>): Promise<void> {
    const docRef = doc(collectionRef, id)
    await setDoc(docRef, text)
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(collectionRef, id)
    await deleteDoc(docRef)
  },
}
