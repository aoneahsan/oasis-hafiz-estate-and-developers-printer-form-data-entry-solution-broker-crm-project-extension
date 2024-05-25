import { atom } from 'recoil';

import { User } from 'firebase/auth';

export const zUserIsAuthenticatedRStateAtom = atom<User | null>({
  key: 'zUserIsAuthenticatedRStateAtom_key',
  default: null
});
