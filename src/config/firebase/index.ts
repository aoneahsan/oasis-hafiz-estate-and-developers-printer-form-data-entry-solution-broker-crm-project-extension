import { initializeApp } from 'firebase/app';
import { ENVS } from '@/utils/EnvKeys';
import {
  initializeAuth,
  signInWithEmailAndPassword,
  getIdToken,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore, addDoc, getDoc, collection } from 'firebase/firestore';
import { IZOasisEntryForm } from '@/Types/oasis';

const firebaseConfig = {
  apiKey: ENVS.firebase.apiKey,
  authDomain: ENVS.firebase.authDomain,
  projectId: ENVS.firebase.projectId,
  storageBucket: ENVS.firebase.storageBucket,
  messagingSenderId: ENVS.firebase.messagingSenderId,
  appId: ENVS.firebase.appId,
  measurementId: ENVS.firebase.measurementId
};

// Initialize Firebase
export const _firebaseApp = initializeApp(firebaseConfig);
const __firebaseAuth = initializeAuth(_firebaseApp);
// __firebaseAuth.setPersistence({
//   type: 'LOCAL'
// });
const _firebaseFirestore = getFirestore(_firebaseApp);

export const frbSignInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return await signInWithEmailAndPassword(__firebaseAuth, email, password);
};

export const frbGetCurrentUser = () => {
  return __firebaseAuth.currentUser;
};

export const frbGetIdToken = async () => {
  if (__firebaseAuth.currentUser) {
    return await getIdToken(__firebaseAuth.currentUser);
  } else {
    return null;
  }
};

export const frbSignOut = async () => {
  return await __firebaseAuth.signOut();
};

export const frbCreateUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return await createUserWithEmailAndPassword(__firebaseAuth, email, password);
};

export const addOasisFormEntryInFirestore = async (data: IZOasisEntryForm) => {
  const _collectionRef = collection(_firebaseFirestore, 'oasis');

  const _itemRef = await addDoc(_collectionRef, data);

  const _item = await getDoc(_itemRef);

  return _item.data();
};
