import { oasisAuthRStateAtom } from '@/Store/oasis';
import React from 'react';
import { useRecoilValue } from 'recoil';
import OasisEntryFormContent from './OasisEntryFormContent';
import OasisEntryFormAuthCheck from '../OasisEntryFormAuthCheck';

const OasisEntryForm: React.FC = () => {
  const oasisAuthRState = useRecoilValue(oasisAuthRStateAtom);

  return oasisAuthRState.isAuthenticated ? (
    <OasisEntryFormContent />
  ) : (
    <OasisEntryFormAuthCheck />
  );
};

export default OasisEntryForm;
