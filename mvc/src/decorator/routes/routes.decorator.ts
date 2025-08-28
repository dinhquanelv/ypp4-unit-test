import { RouteMetadata } from '../../common/types';
import { httpMethod } from '../../common/enums';
import { ROUTES_METADATA } from '../../common/constants';

export const createRouteDecorator =
  (method: string) =>
  (path: string = '') =>
  (target: object, propertyKey: string) => {
    const routes: RouteMetadata[] =
      (Reflect.getMetadata(ROUTES_METADATA, target.constructor) as
        | RouteMetadata[]
        | undefined) ?? [];

    // format path. ex: user -> /user | /user -> /user | //user -> /user
    const formatPath = path.replace(/^\/?/, '/');

    routes.push({
      method,
      path: formatPath,
      handler: propertyKey,
    });

    Reflect.defineMetadata(ROUTES_METADATA, routes, target.constructor);
  };

export const getRoutesMetadata = (target: object) => {
  return Reflect.getMetadata(ROUTES_METADATA, target) as RouteMetadata[];
};

export const Route = {
  Get: createRouteDecorator(httpMethod.GET),
  Post: createRouteDecorator(httpMethod.POST),
  Put: createRouteDecorator(httpMethod.PUT),
  Patch: createRouteDecorator(httpMethod.PATCH),
  Delete: createRouteDecorator(httpMethod.DELETE),
};

export const { Get, Post, Put, Patch, Delete } = Route;
