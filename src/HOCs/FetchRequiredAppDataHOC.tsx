// #region ---- Core Imports ----
import React, { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { useSetRecoilState } from 'recoil';
import { zUserRStateAtom } from '@/Store/Auth/User';
import { _firebaseApp } from '@/config/firebase';
// #endregion

const _firebaseAuth = getAuth(_firebaseApp);

const FetchRequiredAppDataHOC: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const setZUserRState = useSetRecoilState(zUserRStateAtom);

  // #region useEffects
  useEffect(() => {
    onAuthStateChanged(
      _firebaseAuth,
      (_frbUser) => {
        setZUserRState(_frbUser);
      },
      (err) => {
        if (err) {
          setZUserRState(null);
        }
      }
    );
  }, [setZUserRState]);

  // #endregion

  return <>{children}</>;
};

export default FetchRequiredAppDataHOC;
