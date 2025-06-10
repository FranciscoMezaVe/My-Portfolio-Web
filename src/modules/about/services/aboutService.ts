import { db } from '@/plugins/firebase'
import type { TextType } from '@/shared/types/TextType'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import type { ProfileType } from '../types/profileType'

const collectionRef = collection(db, 'About')
const collectionSkillsRef = collection(db, 'Skills')

export async function GetAboutDescription(): Promise<TextType | null> {
  const docRef = doc(collectionRef, 'Description')
  const snapshot = await getDoc(docRef)

  if (!snapshot.exists()) {
    return null
  }

  return snapshot.data() as TextType
}

export async function GetAboutPersonalStatemet(): Promise<TextType | null> {
  const docRef = doc(collectionRef, 'PersonalStatement')
  const snapshot = await getDoc(docRef)

  if (!snapshot.exists()) {
    return null
  }

  return snapshot.data() as TextType
}

export async function SetAboutInfo(data: TextType) {
  const docRef = doc(collectionRef, data.id) // Usa el ID del objeto
  return await setDoc(docRef, data, { merge: true })
}

export async function AddSkill(data: Omit<TextType, 'id'>) {
  const docRef = await addDoc(collectionSkillsRef, data)
  return docRef.id
}

export async function removeSkill(id: string) {
  const docRef = doc(collectionSkillsRef, id)
  await deleteDoc(docRef)
}

export async function getSkills(): Promise<TextType[]> {
  const querySnapshot = await getDocs(collectionSkillsRef)
  const skills = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as TextType)
  return skills
}

export async function setProfile(profile: ProfileType) {
  const profileRef = doc(collectionRef, profile.id)
  return await setDoc(profileRef, profile)
}

export async function getProfile(): Promise<ProfileType> {
  const profileRef = doc(collectionRef, 'Profile')
  const snapshot = await getDoc(profileRef)

  const profile = snapshot.data() as ProfileType

  return profile
}
