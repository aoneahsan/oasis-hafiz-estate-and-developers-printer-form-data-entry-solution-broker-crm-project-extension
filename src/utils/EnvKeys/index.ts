const _env = import.meta.env;

// Backend url for apis

export const ENVS = {
  cryptoSecret:
    _env.VITE_CRYPTO_SECRET ??
    'The Oasis - Hafiz Estate & Developers Project - Developed by Ahsan Mahmood - Manager @ Zaions (https://zaions.com)',
  firebase: {
    apiKey: _env.VITE_FRB_API_KEY ?? '',
    authDomain: _env.VITE_FRB_AUTH_DOMAIN ?? '',
    projectId: _env.VITE_FRB_PROJECT_ID ?? '',
    storageBucket: _env.VITE_FRB_STORAGE_BUCKET ?? '',
    messagingSenderId: _env.VITE_FRB_MESSAGING_SENDER_ID ?? '',
    appId: _env.VITE_FRB_APP_ID ?? '',
    measurementId: _env.VITE_FRB_MEASUREMENT_ID ?? ''
  }
};
