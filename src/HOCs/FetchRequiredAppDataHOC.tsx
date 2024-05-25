// #region ---- Core Imports ----
import React, { useEffect } from 'react';
import { _firebaseAuth } from '@/config/firebase';
import { onAuthStateChanged, onIdTokenChanged } from 'firebase/auth';
import { useSetRecoilState } from 'recoil';
import { zUserIsAuthenticatedRStateAtom } from '@/Store/Auth/User';
// #endregion

const FetchRequiredAppDataHOC: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const setZUserIsAuthenticatedRState = useSetRecoilState(
    zUserIsAuthenticatedRStateAtom
  );

  // #region useEffects
  useEffect(() => {
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
