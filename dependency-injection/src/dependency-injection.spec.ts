import 'reflect-metadata';
import {
  Container,
  Injectable,
  Scope,
  container,
} from '../dependency-injection/index';

@Injectable()
class TestService {
  getValue(): string {
    return 'test-value';
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
  constructor(private testService: TestService) {}

  getDependentValue(): string {
    return `dependent-${this.testService.getValue()}`;
  }
}

describe('Dependency Injection Container', () => {
  beforeEach(() => {
    container.clear();

    Container.register(TestService, Scope.SINGLETON);
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

    it('should register a service with specified scope', () => {
      class NewService {}
      Container.register(NewService, Scope.TRANSIENT);

      expect(container.has(NewService)).toBe(true);
      expect(container.get(NewService)?.scope).toBe(Scope.TRANSIENT);
    });
  });

  describe('Container.resolve', () => {
    it('should resolve SINGLETON service and return same instance', () => {
      const instance1 = Container.resolve(TestService);
      const instance2 = Container.resolve(TestService);

      expect(instance1).toBe(instance2);
      expect(instance1.getValue()).toBe('test-value');
    });

    it('should resolve TRANSIENT service and return new instance each time', () => {
      const instance1 = Container.resolve(TransientService);
      const instance2 = Container.resolve(TransientService);

      expect(instance1).not.toBe(instance2);
      expect(instance1.getValue()).toBe('transient-value');
      expect(instance2.getValue()).toBe('transient-value');
    });

    it('should resolve REQUEST service and return new instance each time', () => {
      const instance1 = Container.resolve(RequestService);
      const instance2 = Container.resolve(RequestService);

      expect(instance1).not.toBe(instance2);
      expect(instance1.getValue()).toBe('request-value');
      expect(instance2.getValue()).toBe('request-value');
    });

    it('should resolve service with dependencies', () => {
      const dependentInstance = Container.resolve(DependentService);

      expect(dependentInstance.getDependentValue()).toBe(
        'dependent-test-value',
      );
    });

    it('should throw error when trying to resolve unregistered service', () => {
      class UnregisteredService {}

      expect(() => Container.resolve(UnregisteredService)).toThrow();
    });
  });

  describe('@Injectable decorator', () => {
    it('should register class with default SINGLETON scope', () => {
      @Injectable()
      class DecoratedService {}

      expect(container.has(DecoratedService)).toBe(true);
      expect(container.get(DecoratedService)?.scope).toBe(Scope.SINGLETON);
    });

    it('should register class with transient scope', () => {
      @Injectable({ scope: Scope.TRANSIENT })
      class DecoratedTransientService {}

      expect(container.has(DecoratedTransientService)).toBe(true);
      expect(container.get(DecoratedTransientService)?.scope).toBe(
        Scope.TRANSIENT,
      );
    });

    it('should register class with request scope', () => {
      @Injectable({ scope: Scope.REQUEST })
      class DecoratedRequestService {}

      expect(container.has(DecoratedRequestService)).toBe(true);
      expect(container.get(DecoratedRequestService)?.scope).toBe(Scope.REQUEST);
    });
  });

  describe('Container error handling', () => {
    it('should handle circular dependencies gracefully', () => {
      @Injectable()
      class ServiceB {
        constructor() {}
      }

      @Injectable()
      class ServiceA {
        constructor(private serviceB: ServiceB) {}
      }

      Container.register(ServiceA);
      Container.register(ServiceB);

      expect(() => Container.resolve(ServiceA)).not.toThrow();
    });
  });
});
