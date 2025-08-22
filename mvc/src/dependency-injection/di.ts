import 'reflect-metadata';

export enum Scope {
  SINGLETON = 'SINGLETON',
  TRANSIENT = 'TRANSIENT',
  REQUEST = 'REQUEST',
}

export type Newable<T = unknown> = new (...args: unknown[]) => T;

export interface ProviderInfo<T = unknown> {
  instance?: T;
  scope: Scope;
}

export const container = new Map<Newable, ProviderInfo>();

export class Container {
  static register(provider: Newable, scope: Scope = Scope.SINGLETON): void {
    void (container.get(provider) ?? container.set(provider, { scope }));
  }

  static resolve<T>(provider: Newable<T>, context?: Map<Newable, any>): T {
    const metadata = container.get(provider);
    if (!metadata) {
      throw new Error(`Class ${provider.name} is not registered`);
    }

    const { instance, scope } = metadata;

    const scopeHandler: Record<Scope, () => T> = {
      [Scope.SINGLETON]: () => {
        if (!instance) {
          const newInstance = Container.createInstance(provider);
          container.set(provider, { instance: newInstance, scope });

          return newInstance;
        }

        return instance as T;
      },
      [Scope.TRANSIENT]: () => Container.createInstance(provider),
      [Scope.REQUEST]: () => {
        if (!context) {
          throw new Error('Context is required');
        }

        return (
          (context.get(provider) as T) ??
          ((context.set(provider, Container.createInstance(provider)) &&
            context.get(provider)) as T)
        );
      },
    };

    return scopeHandler[scope]();
  }

  private static createInstance<T>(provider: Newable<T>): T {
    const metadata =
      (Reflect.getMetadata('design:paramtypes', provider) as
        | Newable[]
        | undefined) || [];

    const constructorDeps: Newable[] = metadata;

    const resolvedDeps = constructorDeps.map((dep) => {
      return Container.resolve(dep);
    });

    const instance = new provider(...resolvedDeps);

    return instance;
  }
}

export function Injectable(option?: { scope?: Scope }) {
  return function (provider: Newable) {
    const scope = option?.scope || Scope.SINGLETON;

    Container.register(provider, scope);
  };
}
