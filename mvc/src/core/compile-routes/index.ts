import { getGlobalPrefix } from '../global-prefix';
import { ClassType, RouteMetadata } from '../../common/types';
import {
  FINAL_PATH_METADATA,
  PREFIX_METADATA,
  ROUTES_METADATA,
} from '../../common/constants';

export const compileRoutes = (target: ClassType) => {
  const routes: RouteMetadata[] = Reflect.getMetadata(
    ROUTES_METADATA,
    target,
  ) as RouteMetadata[];
  const controllerPrefix = Reflect.getMetadata(
    PREFIX_METADATA,
    target,
  ) as string;

  const finalPath = routes.map((route) => ({
    ...route,
    path: `${getGlobalPrefix()}${controllerPrefix}${route.path}`.replace(
      /\/+/g,
      '/',
    ),
  }));

  Reflect.defineMetadata(FINAL_PATH_METADATA, finalPath, target);

  return finalPath;
};
