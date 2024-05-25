import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getRemoteConfig } from 'firebase-admin/remote-config';

// Initialize the Firebase app with the configuration object
const fbApp = initializeApp({
    databaseURL: 'http://127.0.0.1:9000/?ns=z-job-tracker',
    storageBucket: 'gs://z-job-tracker.appspot.com',
});

/**
 * Firebase Firestore database.
 */
const fbDB = getFirestore();

/**
 * Firebase Remote Config.
 */
const fbRC = getRemoteConfig();

export { fbDB, fbApp, fbRC };
