import 'reflect-metadata';

export interface RouteMetadata {
  method: string;
  path: string;
  handler: string;
}

export enum httpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export const createRouteDecorator =
  (method: string) =>
  (path: string = '') =>
  (target: object, propertyKey: string) => {
    const routes: RouteMetadata[] =
      (Reflect.getMetadata('routes', target.constructor) as
        | RouteMetadata[]
        | undefined) ?? [];

    const finalPath = path.replace(/^\/?/, '/');

    routes.push({
      method,
      path: finalPath,
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
