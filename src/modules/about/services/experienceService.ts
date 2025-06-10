import { db } from '@/plugins/firebase'
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore'
import type { TimelineEditType } from '../types/timelineEditType'

const collectionRef = collection(db, 'experience')

export async function fetchExperiences(): Promise<TimelineEditType[]> {
  const snapshot = await getDocs(collectionRef)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as TimelineEditType)
}

export async function addExperience(data: TimelineEditType): Promise<TimelineEditType> {
  const { id, ...dataWithoutId } = data
  const docRef = await addDoc(collectionRef, dataWithoutId)
  return {
    id: docRef.id,
    ...dataWithoutId,
  }
}

export async function updateExperience(data: TimelineEditType) {
  const { id, ...dataWithoutId } = data
  await setDoc(doc(collectionRef, id), dataWithoutId)
}

export async function deleteExperience(id: string) {
  return await deleteDoc(doc(collectionRef, id))
}
