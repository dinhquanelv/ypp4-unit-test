import 'reflect-metadata';
import { ClassType } from '../types';

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

    // format path. ex: user -> /user | /user -> /user | //user -> /user
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

export const Controller = (prefix: string) => (target: ClassType) => {
  // format path. ex: user -> /user | /user -> /user | //user -> /user
  const finalPrefix = prefix.replace(/^\/?/, '/');

  Reflect.defineMetadata('prefix', finalPrefix, target);
};
