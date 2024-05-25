import { atom } from 'recoil';

export const oasisAuthRStateAtom = atom({
  key: 'oasisAuthRStateAtom_key',
  default: {
    isAuthenticated: false,
    user: null,
    token: null
  }
});
