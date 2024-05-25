import { homeRoute, loginRoute, registerRoute } from './AllRoutes';
import tanstackRootRoute from './RootRoute';
import { oasisEntryForm } from './oasisRoutes';

const routeTree = tanstackRootRoute.addChildren([
  homeRoute,
  registerRoute,
  loginRoute,
  oasisEntryForm
]);

export default routeTree;
