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
import {
  initializeAnalytics,
  logEvent,
  EventNameString
} from 'firebase/analytics';

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
const _firebaseAnalytics = initializeAnalytics(_firebaseApp);

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

export const frbLogAnalyticsEvent = <T extends object>(
  eventName: EventNameString = 'page_view',
  eventParams: T
) => {
  let windowDetails = {};
  let userAgentDetails = {};

  try {
    windowDetails = {
      screen_width: window.screen.width,
      screen_height: window.screen.height,
      window_inner_width: window.innerWidth,
      window_inner_height: window.innerHeight,
      window_outer_width: window.outerWidth,
      window_outer_height: window.outerHeight,
      window_device_pixel_ratio: window.devicePixelRatio
    };
  } catch (error) {}

  try {
    userAgentDetails = {
      user_agent: navigator.userAgent,
      user_agent_platform: navigator.platform,
      user_agent_vendor: navigator.vendor,
      user_agent_vendor_sub: navigator.vendorSub,
      user_agent_app_code_name: navigator.appCodeName,
      user_agent_app_name: navigator.appName,
      user_agent_app_version: navigator.appVersion,
      user_agent_product: navigator.product,
      user_agent_product_sub: navigator.productSub,
      user_agent_language: navigator.language,
      user_agent_on_line: navigator.onLine,
      user_agent_cookie_enabled: navigator.cookieEnabled,
      user_agent_do_not_track: navigator.doNotTrack,
      user_agent_hardware_concurrency: navigator.hardwareConcurrency,
      user_agent_max_touch_points: navigator.maxTouchPoints,
      user_agent_media_capabilities: navigator.mediaCapabilities,
      user_agent_permissions: navigator.permissions,
      user_agent_plugins: navigator.plugins,
      user_agent_service_worker: navigator.serviceWorker,
      user_agent_storage: navigator.storage,
      user_agent_web_driver: navigator.webdriver
    };
  } catch (error) {}

  logEvent(_firebaseAnalytics, eventName as string, {
    windowDetails,
    userAgentDetails,
    ...eventParams
  });
};

export const frbLogPageViewAnalyticsEvent = <T extends object>(
  pagePath: string,
  eventParams: T
) => {
  frbLogAnalyticsEvent('page_view', {
    ...eventParams,
    page_path: pagePath
  });
};
