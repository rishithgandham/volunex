import { db } from '@/firebase/firebase';
import { FirebaseApp, getApp } from 'firebase/app';
import {
  Auth,
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import {
  DocumentData,
  DocumentReference,
  collection,
  doc,
  getDoc,
} from 'firebase/firestore';

const opportunityRef = collection(db, 'volunteer_opportunities');

class AuthService {
  auth: Auth;

  constructor(app: FirebaseApp) {
    this.auth = auth;
  }

  async loginWithGoogle() {
    await signInWithRedirect(this.auth, new GoogleAuthProvider());
    getRedirectResult(this.auth)
      .then(user => {
        return user?.user;
      })
      .catch(err => {
        console.log(err);
        return undefined;
      });
  }

  async getAppUser() {
    console.log(this.auth);
    const docRef = doc(db, 'users', this.auth.currentUser?.uid as string);
    const docSnap = await getDoc(docRef)
      .then(doc => {
        console.log(doc);
        return doc.data();
      })
      .catch(err => {
        console.log(err);
        return undefined;
      });
    console.log(docSnap);
    return docSnap;
  }

  async logOut() {
    await signOut(this.auth);
  }
}

const app = getApp();
export const auth = getAuth(app);
const authService = new AuthService(app);

export default authService;
