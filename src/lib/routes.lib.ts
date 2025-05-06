import { RouteSelfT, RoutesT } from '@/config/routes.config';

export const flattenRoutes = (routes: RoutesT): RouteSelfT[] => {
  return Object.values(routes).flatMap(({ self, ...subRoutes }) => [
    self,
    ...(subRoutes ? flattenRoutes(subRoutes as RoutesT) : []),
  ]);
};
