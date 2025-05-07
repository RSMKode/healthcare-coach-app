import { IconType } from 'react-icons';
import { TbHome, TbUser, TbUsers } from 'react-icons/tb';

export type RouteSelfT = {
  path: string;
  name: string;
  icon?: IconType;
  type: string;
};

export type RouteT = {
  self: RouteSelfT;
  [key: string]: RouteSelfT | RouteT;
};
export type RoutesT = Record<string, RouteT>;

const updatePaths = <T extends RoutesT>(
  routes: T,
  parentPath: string = '',
  visited: Set<RoutesT> = new Set()
): T => {
  if (visited.has(routes)) {
    return routes;
  }
  visited.add(routes);

  const result: RoutesT = {};

  for (const key in routes) {
    const route = routes[key];
    if (route.self) {
      route.self.path = parentPath + route.self.path;
    }
    result[key] = {
      ...route,
      ...updatePaths(
        route as RoutesT,
        route.self ? route.self.path : parentPath,
        visited
      ),
    };
  }

  return result as T;
};

export const ROUTES = {
  home: {
    self: {
      name: 'Home',
      path: '/dashboard',
      icon: TbHome,
      type: 'home',
    },
  },
  // login: {
  //   self: {
  //     name: "Inicio de sesión",
  //     fullName: "Inicio de sesión",
  //     path: "/login",
  //     icon: IoMdLogIn,
  //     type: "login",
  //   },
  // },
  patients: {
    self: {
      name: 'Patients',
      path: '/patients',
      icon: TbUsers,
      type: 'section',
    },
    patientId: {
      self: {
        name: 'Patient',
        path: '/:patientId',
        icon: TbUser,
        type: 'page',
      },
    },
  },
} as const;
export type RoutesDefT = typeof ROUTES;

//? Esto actualiza los paths de las rutas recursivamente para que tengan el path completo
updatePaths(ROUTES);

