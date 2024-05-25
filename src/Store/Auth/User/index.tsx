import { atom } from 'recoil';

import { User } from 'firebase/auth';

export const zUserRStateAtom = atom<User | null>({
  key: 'zUserRStateAtom_key',
  default: null
});
