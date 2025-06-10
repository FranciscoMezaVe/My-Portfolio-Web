import { db } from '@/plugins/firebase'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'

const collectionRef = collection(db, 'About')

export async function getImageOfProfile(): Promise<string> {
  const docRef = doc(collectionRef, 'Profile')
  const snapshot = await getDoc(docRef)

  const base64Image = snapshot.get('base64Image') as string
  return base64Image
}

export async function setImageProfile(base64Image: string) {
  const profileRef = doc(collectionRef, 'Profile')

  await updateDoc(profileRef, { base64Image: base64Image })
}
