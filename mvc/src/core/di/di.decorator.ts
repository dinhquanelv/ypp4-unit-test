import { Container } from './container';
import { ClassType } from '../../common/types';
import { Scope } from '../../common/enums';
export { Container, container, ProviderInfo } from './container';

export function Injectable(option?: { scope?: Scope }) {
  return function (provider: ClassType) {
    const scope = option?.scope || Scope.SINGLETON;

    Container.register(provider, scope);
  };
}
