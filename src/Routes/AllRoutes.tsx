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
import { _firebaseAuth } from '@/config/firebase';
// #endregion

// on window refresh
export const privateRouteHandler = async (
  navigate: NavigateFn
): Promise<void> => {
  if (_firebaseAuth.currentUser === null) {
    navigate({
      to: AppRoutes.login
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
  // beforeLoad: async ({ location }) => {},
});

// --- Login
export const loginRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.login,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/Pages/Public/Login')
  ),
  beforeLoad: ({ navigate }) => publicRouteHandler(navigate)
});

// --- Register
export const registerRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.register,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/Pages/Public/Register')
  ),
  beforeLoad: ({ navigate }) => publicRouteHandler(navigate)
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
