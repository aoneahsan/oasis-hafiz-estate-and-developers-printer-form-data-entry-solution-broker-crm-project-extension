import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import tanstackRootRoute from './RootRoute';
import { AppRoutes } from './AppRoutes';
// import { privateRouteHandler } from './AllRoutes';

export const oasisEntryForm = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.oasis.entryForm,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/Pages/oasis/OasisEntryForm')
  )
  // beforeLoad: ({ navigate }) => privateRouteHandler(navigate)
});

export const oasisEntryView = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.oasis.viewEntryData,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/Pages/oasis/OasisFormEntryView')
  )
  // beforeLoad: ({ navigate }) => privateRouteHandler(navigate)
});
