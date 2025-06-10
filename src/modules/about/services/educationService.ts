import { db } from '@/plugins/firebase'
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore'
import type { TimelineEditType } from '../types/timelineEditType'

const collectionRef = collection(db, 'education')

export async function fetchEducation(): Promise<TimelineEditType[]> {
  const snapshot = await getDocs(collectionRef)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as TimelineEditType)
}

export async function addEducation(data: TimelineEditType): Promise<TimelineEditType> {
  const { id, ...dataWithoutId } = data
  const docRef = await addDoc(collectionRef, dataWithoutId)
  return {
    id: docRef.id,
    ...dataWithoutId,
  }
}

export async function updateEducation(data: TimelineEditType) {
  const { id, ...dataWithoutId } = data
  await setDoc(doc(collectionRef, id), dataWithoutId)
}

export async function deleteEducation(id: string) {
  return await deleteDoc(doc(collectionRef, id))
}
