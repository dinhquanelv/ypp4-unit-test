import { RouteMetadata } from '../../types';
import { httpMethod } from '../../enum';

export const createRouteDecorator =
  (method: string) =>
  (path: string = '') =>
  (target: object, propertyKey: string) => {
    const routes: RouteMetadata[] =
      (Reflect.getMetadata('routes', target.constructor) as
        | RouteMetadata[]
        | undefined) ?? [];

    // format path. ex: user -> /user | /user -> /user | //user -> /user
    const formatPath = path.replace(/^\/?/, '/');

    routes.push({
      method,
      path: formatPath,
      handler: propertyKey,
    });

    Reflect.defineMetadata('routes', routes, target.constructor);
  };

export const Route = {
  Get: createRouteDecorator(httpMethod.GET),
  Post: createRouteDecorator(httpMethod.POST),
  Put: createRouteDecorator(httpMethod.PUT),
  Patch: createRouteDecorator(httpMethod.PATCH),
  Delete: createRouteDecorator(httpMethod.DELETE),
};

export const { Get, Post, Put, Patch, Delete } = Route;
