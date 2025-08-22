import 'reflect-metadata';
import { Container, Injectable, Scope, container } from './di';

@Injectable()
class DefaultService {
  getValue(): string {
    return 'default-value';
  }
}

@Injectable({ scope: Scope.TRANSIENT })
class TransientService {
  getValue(): string {
    return 'transient-value';
  }
}

@Injectable({ scope: Scope.REQUEST })
class RequestService {
  getValue(): string {
    return 'request-value';
  }
}

@Injectable()
class DependentService {
  constructor(private defaultService: DefaultService) {}

  getDependentValue(): string {
    return `dependent-${this.defaultService.getValue()}`;
  }
}

describe('Dependency Injection Container', () => {
  beforeEach(() => {
    container.clear();

    Container.register(DefaultService, Scope.SINGLETON);
    Container.register(TransientService, Scope.TRANSIENT);
    Container.register(RequestService, Scope.REQUEST);
    Container.register(DependentService, Scope.SINGLETON);
  });

  describe('Container.register', () => {
    it('should register a service with default SINGLETON scope', () => {
      class NewService {}
      Container.register(NewService);

      expect(container.has(NewService)).toBe(true);
      expect(container.get(NewService)?.scope).toBe(Scope.SINGLETON);
    });

    it('should register a service with TRANSIENT scope', () => {
      class NewService {}
      Container.register(NewService, Scope.TRANSIENT);

      expect(container.has(NewService)).toBe(true);
      expect(container.get(NewService)?.scope).toBe(Scope.TRANSIENT);
    });

    it('should register a service with REQUEST scope', () => {
      class NewService {}
      Container.register(NewService, Scope.REQUEST);

      expect(container.has(NewService)).toBe(true);
      expect(container.get(NewService)?.scope).toBe(Scope.REQUEST);
    });
  });

  describe('Container.resolve', () => {
    it('should resolve SINGLETON service and return same instance', () => {
      const instance1 = Container.resolve(DefaultService);
      const instance2 = Container.resolve(DefaultService);

      expect(instance1).toBe(instance2);
      expect(instance1.getValue()).toBe('default-value');
    });

    it('should resolve TRANSIENT service and return new instance each time', () => {
      const instance1 = Container.resolve(TransientService);
      const instance2 = Container.resolve(TransientService);

      expect(instance1).not.toBe(instance2);
      expect(instance1.getValue()).toBe('transient-value');
      expect(instance2.getValue()).toBe('transient-value');
    });

    it('should resolve REQUEST service and return same instance within same context', () => {
      const context1 = new Map();
      const context2 = new Map();

      const instance1 = Container.resolve(RequestService, context1);
      const instance2 = Container.resolve(RequestService, context1);
      const instance3 = Container.resolve(RequestService, context2);

      expect(instance1).toBe(instance2);
      expect(instance1).not.toBe(instance3);
      expect(instance1.getValue()).toBe('request-value');
      expect(instance2.getValue()).toBe('request-value');
      expect(instance3.getValue()).toBe('request-value');
    });

    it('should throw error when resolving REQUEST service without context', () => {
      expect(() => Container.resolve(RequestService)).toThrow();
    });

    it('should resolve service with dependencies', () => {
      const dependentInstance = Container.resolve(DependentService);

      expect(dependentInstance.getDependentValue()).toBe(
        'dependent-default-value',
      );
    });

    it('should throw error when trying to resolve unregistered service', () => {
      class UnregisteredService {}

      expect(() => Container.resolve(UnregisteredService)).toThrow();
    });
  });
});
