import { homeRoute } from './AllRoutes';
import tanstackRootRoute from './RootRoute';
import { oasisEntryForm, oasisEntryView } from './oasisRoutes';

const routeTree = tanstackRootRoute.addChildren([
  homeRoute,
  oasisEntryForm,
  oasisEntryView
]);

export default routeTree;
