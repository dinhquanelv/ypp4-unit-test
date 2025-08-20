import 'reflect-metadata';

export enum Scope {
  SINGLETON = 'SINGLETON',
  TRANSIENT = 'TRANSIENT',
  REQUEST = 'REQUEST',
}

export type Newable<T = unknown> = new (...args: unknown[]) => T;

export interface InjectableMetadata<T = unknown> {
  instance?: T;
  scope: Scope;
}

export const container = new Map<Newable, InjectableMetadata>();

export class Container {
  static register(provider: Newable, scope: Scope = Scope.SINGLETON): void {
    if (!container.has(provider)) {
      container.set(provider, { scope });
    }
  }

  static resolve<T>(targetClass: Newable<T>): T {
    const metadata = container.get(targetClass);
    if (!metadata) {
      throw new Error(`Class ${targetClass.name} is not registered`);
    }

    const { instance, scope } = metadata;

    const scopeHandler: Record<Scope, () => T> = {
      [Scope.SINGLETON]: () => {
        if (!instance) {
          const newInstance = Container.createInstance(targetClass);
          container.set(targetClass, { instance: newInstance, scope });
          return newInstance;
        }
        return instance as T;
      },
      [Scope.TRANSIENT]: () => Container.createInstance(targetClass),
      [Scope.REQUEST]: () => Container.createInstance(targetClass),
    };

    return scopeHandler[scope]();
  }

  private static createInstance<T>(targetClass: Newable<T>): T {
    const metadata =
      (Reflect.getMetadata('design:paramtypes', targetClass) as
        | Newable[]
        | undefined) || [];

    const constructorDeps: Newable[] = metadata;

    const resolvedDeps = constructorDeps.map((dep) => {
      return Container.resolve(dep);
    });

    const instance = new targetClass(...resolvedDeps);

    return instance;
  }
}

export function Injectable(option?: { scope?: Scope }) {
  return function (targetClass: Newable) {
    const scope = option?.scope || Scope.SINGLETON;

    Container.register(targetClass, scope);
  };
}
