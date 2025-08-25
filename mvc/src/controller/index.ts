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

export const Route: {
  [K in keyof typeof httpMethod as Capitalize<Lowercase<K>>]: ReturnType<
    typeof createRouteDecorator
  >;
} = Object.values(httpMethod).reduce((acc, method) => {
  const key = method[0] + method.slice(1).toLowerCase();
  (acc as any)[key] = createRouteDecorator(method);
  return acc;
}, {} as any);

export const { Get, Post, Put, Patch, Delete } = Route;
