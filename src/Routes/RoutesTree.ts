import { homeRoute } from './AllRoutes';
import tanstackRootRoute from './RootRoute';
import { oasisEntryForm } from './oasisRoutes';

const routeTree = tanstackRootRoute.addChildren([homeRoute, oasisEntryForm]);

export default routeTree;
