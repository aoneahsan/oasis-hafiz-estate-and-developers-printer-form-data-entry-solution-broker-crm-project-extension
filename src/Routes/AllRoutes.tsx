// #region Packages imports
import {
  lazyRouteComponent,
  redirect,
  createRoute,
  NavigateFn
} from '@tanstack/react-router';
// #endregion

// #region Custom imports
import tanstackRootRoute from './RootRoute';
import { AppRoutes } from '@/Routes/AppRoutes';
import { getAuth } from 'firebase/auth';
import { _firebaseApp } from '@/config/firebase';
// #endregion

const _firebaseAuth = getAuth(_firebaseApp);

// on window refresh
export const privateRouteHandler = async (
  navigate: NavigateFn
): Promise<void> => {
  if (_firebaseAuth.currentUser === null) {
    // navigate({
    //   to: AppRoutes.login
    // });
    navigate({
      to: AppRoutes.home
    });
  }
};

export const publicRouteHandler = async (
  navigate: NavigateFn
): Promise<void> => {
  if (_firebaseAuth.currentUser !== null) {
    navigate({
      to: AppRoutes.oasis.entryForm
    });
  }
};

// --- Home
export const homeRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.home,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/Pages/Public/Home')
  )
});

// --- Login
export const loginRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.login,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/Pages/Public/Login')
  )
  // beforeLoad: ({ navigate }) => publicRouteHandler(navigate)
  // beforeLoad: ({ navigate }) => {
  //   navigate({
  //     to: AppRoutes.home
  //   });
  // }
});

// --- Register
export const registerRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.register,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/Pages/Public/Register')
  )
  // beforeLoad: ({ navigate }) => publicRouteHandler(navigate)
  // beforeLoad: ({ navigate }) => {
  //   navigate({
  //     to: AppRoutes.home
  //   });
  // }
});

// export const forgotRoute = createRoute({
//   getParentRoute: () => tanstackRootRoute,
//   path: AppRoutes.forgotPassword,
//   component: lazyRouteComponent(
//     async (): Promise<Record<string, unknown>> =>
//       await import('@/Pages/Public/ForgotPassword')
//   ),
//   beforeLoad: ({ navigate }) => publicRouteHandler(navigate)
// });
