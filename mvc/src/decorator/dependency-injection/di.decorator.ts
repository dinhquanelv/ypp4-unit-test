import { Container } from './container';
import { ClassType } from '../../types';
import { Scope } from '../../enum';
export { Container, container, ProviderInfo } from './container';

export function Injectable(option?: { scope?: Scope }) {
  return function (provider: ClassType) {
    const scope = option?.scope || Scope.SINGLETON;

    Container.register(provider, scope);
  };
}
