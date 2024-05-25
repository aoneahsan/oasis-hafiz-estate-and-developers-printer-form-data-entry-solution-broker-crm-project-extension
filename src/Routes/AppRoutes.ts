const routeParams = {
  oasisEntryQrCode: 'oasisEntryQrCode'
} as const;

const AppRoutesE = {
  home: '/',
  login: '/sign-in',
  register: '/sign-up',
  forgotPassword: '/forgot-password',

  oasis: {
    entryForm: '/zaions/oasis/entry-form',
    viewEntryData: `/hafiz-estate-developers/opqr/$${routeParams.oasisEntryQrCode}`
  }
} as const;

// export const getFullPage

export const AppRoutes = {
  ...AppRoutesE
} as const;
