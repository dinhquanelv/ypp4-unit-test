import 'reflect-metadata';
import { ClassType } from '../../common/types';
import { Scope } from '../../common/enums';
import { DESIGN_PARAMTYPES_METADATA } from '../../common/constants';

export interface ProviderInfo<T = unknown> {
  instance?: T;
  scope: Scope;
}

export const container = new Map<ClassType, ProviderInfo>();

export class Container {
  static register(provider: ClassType, scope: Scope = Scope.SINGLETON): void {
    void (container.get(provider) ?? container.set(provider, { scope }));
  }

  static resolve<T>(provider: ClassType<T>, context?: Map<ClassType, any>): T {
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

  private static createInstance<T>(provider: ClassType<T>): T {
    const metadata =
      (Reflect.getMetadata(DESIGN_PARAMTYPES_METADATA, provider) as
        | ClassType[]
        | undefined) || [];

    const constructorDeps: ClassType[] = metadata;

    const resolvedDeps = constructorDeps.map((dep) => {
      return Container.resolve(dep);
    });

    const instance = new provider(...resolvedDeps);

    return instance;
  }
}
