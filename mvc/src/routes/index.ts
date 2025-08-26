import { getGlobalPrefix } from '../core/global-prefix';
import { ClassType, RouteMetadata } from '../types';

export const compileRoutes = (target: ClassType) => {
  const routes: RouteMetadata[] = Reflect.getMetadata(
    'routes',
    target,
  ) as RouteMetadata[];
  const controllerPrefix = Reflect.getMetadata('prefix', target) as string;

  const finalPath = routes.map((route) => ({
    ...route,
    path: `${getGlobalPrefix()}${controllerPrefix}${route.path}`.replace(
      /\/+/g,
      '/',
    ),
  }));

  Reflect.defineMetadata('finalPath', finalPath, target);

  return finalPath;
};
