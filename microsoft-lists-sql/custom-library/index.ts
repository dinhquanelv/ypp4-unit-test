import 'reflect-metadata';

export enum Scope {
  SINGLETON = 'SINGLETON',
  TRANSIENT = 'TRANSIENT',
  REQUEST = 'REQUEST',
}

type Constructor<T = any> = new (...args: any[]) => T;

interface ProviderRecord {
  instance: any;
  scope: Scope;
  target: Constructor;
  dependencies?: Constructor[];
}

const providerRegister = new Map<Constructor, ProviderRecord>();

const INJECTABLE_METADATA = 'custom:injectable';
const PARAMTYPES_METADATA = 'design:paramtypes';
const SCOPE_METADATA = 'custom:scope';

export function Injectable(option?: { scope?: Scope }) {
  return function (target: Constructor) {
    const scope = option?.scope || Scope.SINGLETON;

    Reflect.defineMetadata(INJECTABLE_METADATA, true, target);
    Reflect.defineMetadata(SCOPE_METADATA, scope, target);

    const dependencies = (Reflect.getMetadata(PARAMTYPES_METADATA, target) ||
      []) as Constructor[];

    providerRegister.set(target, {
      instance: null,
      scope,
      target,
      dependencies,
    });
  };
}

function getOrCreate<K, V>(map: Map<K, V>, key: K, create: () => V): V {
  if (!map.has(key)) {
    map.set(key, create());
  }
  return map.get(key)!;
}

const scopeResolvers = {
  [Scope.TRANSIENT]: <T>(
    target: Constructor<T>,
    requestContext?: Map<Constructor, any>,
  ): T => createInstance(target, requestContext),

  [Scope.REQUEST]: <T>(
    target: Constructor<T>,
    requestContext?: Map<Constructor, any>,
  ): T => {
    if (!requestContext) {
      throw new Error(`No request context provided for ${target.name}`);
    }
    return getOrCreate(requestContext, target, () =>
      createInstance(target, requestContext),
    ) as T;
  },

  [Scope.SINGLETON]: <T>(
    target: Constructor<T>,
    requestContext?: Map<Constructor, any>,
  ): T => {
    const record = providerRegister.get(target)!;
    if (!record.instance) {
      record.instance = createInstance(target, requestContext);
    }
    return record.instance as T;
  },
};

export function resolve<T>(
  target: Constructor<T>,
  requestContext?: Map<Constructor, any>,
): T {
  const record = providerRegister.get(target);
  if (!record) {
    throw new Error(`No provider registered for ${target.name}`);
  }

  const resolver = scopeResolvers[record.scope];
  return resolver(target, requestContext);
}

function createInstance<T>(
  target: Constructor<T>,
  requestContext?: Map<Constructor, any>,
): T {
  const record = providerRegister.get(target);
  if (!record) {
    throw new Error(`No provider registered for ${target.name}`);
  }

  const dependencies = record.dependencies || [];
  const resolvedDependencies: unknown[] = dependencies.map((dep) => {
    if (!dep) {
      return undefined;
    }
    return resolve(dep, requestContext) as unknown;
  });

  return Reflect.construct(target, resolvedDependencies);
}

export class Container {
  private static requestContexts = new Map<any, Map<Constructor, any>>();

  static get<T>(target: Constructor<T>, requestId?: any): T {
    let requestContext: Map<Constructor, any> | undefined;

    if (requestId) {
      requestContext = getOrCreate(
        this.requestContexts,
        requestId,
        () => new Map(),
      );
    }

    return resolve(target, requestContext);
  }

  static clearRequestContext(requestId: any): void {
    this.requestContexts.delete(requestId);
  }

  static reset(): void {
    providerRegister.clear();
  }
}
