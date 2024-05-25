import { initializeApp } from 'firebase/app';
import { ENVS } from '@/utils/EnvKeys';
import {
  initializeAuth,
  signInWithEmailAndPassword,
  getIdToken,
  createUserWithEmailAndPassword
} from 'firebase/auth';

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
const _firebaseApp = initializeApp(firebaseConfig);
export const _firebaseAuth = initializeAuth(_firebaseApp);

export const frbSignInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return await signInWithEmailAndPassword(_firebaseAuth, email, password);
};

export const frbGetCurrentUser = () => {
  return _firebaseAuth.currentUser;
};

export const frbGetIdToken = async () => {
  if (_firebaseAuth.currentUser) {
    return await getIdToken(_firebaseAuth.currentUser);
  } else {
    return null;
  }
};

export const frbSignOut = async () => {
  return await _firebaseAuth.signOut();
};

export const frbCreateUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return await createUserWithEmailAndPassword(_firebaseAuth, email, password);
};
