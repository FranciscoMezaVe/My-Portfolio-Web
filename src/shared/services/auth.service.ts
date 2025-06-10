import { auth } from '@/plugins/firebase'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
  type UserCredential,
} from 'firebase/auth'
import type { FirebaseError } from 'firebase/app'

export type LoginResult =
  | { success: true; data: UserCredential }
  | { success: false; error: FirebaseError }

export async function login(email: string, password: string): Promise<LoginResult> {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, data: credentials }
  } catch (error) {
    return {
      success: false,
      error: error as FirebaseError,
    }
  }
}

export async function logout() {
  await signOut(auth)
}

export async function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe()
        resolve(user)
      },
      reject,
    )
  })
}
