// #region ---- Core Imports ----
import React, { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged, onIdTokenChanged } from 'firebase/auth';
import { useSetRecoilState } from 'recoil';
import { zUserIsAuthenticatedRStateAtom } from '@/Store/Auth/User';
import { _firebaseApp } from '@/config/firebase';
// #endregion

const _firebaseAuth = getAuth(_firebaseApp);

const FetchRequiredAppDataHOC: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const setZUserIsAuthenticatedRState = useSetRecoilState(
    zUserIsAuthenticatedRStateAtom
  );

  // #region useEffects
  useEffect(() => {
    console.log({ user: _firebaseAuth.currentUser });
    onAuthStateChanged(
      _firebaseAuth,
      (_frbUser) => {
        console.log('FetchRequiredAppDataHOC -> Firebase User', _frbUser);
        setZUserIsAuthenticatedRState(_frbUser);
      },
      (frbAuthError) => {
        console.error(
          'FetchRequiredAppDataHOC -> Firebase Auth Error',
          frbAuthError
        );

        setZUserIsAuthenticatedRState(null);
      }
    );

    onIdTokenChanged(
      _firebaseAuth,
      (res) => {
        console.log('FetchRequiredAppDataHOC -> Firebase Token Changed', res);
      },
      (err) => {
        console.error('FetchRequiredAppDataHOC -> Firebase Token Error', err);
      }
    );
  }, [setZUserIsAuthenticatedRState]);

  // #endregion

  return <>{children}</>;
};

export default FetchRequiredAppDataHOC;
