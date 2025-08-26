import { getGlobalPrefix, setGlobalPrefix } from './index';

setGlobalPrefix('/api');

describe('Controller Decorator', () => {
  it('should return global prefix', () => {
    expect(getGlobalPrefix()).toEqual('/api');
  });
});
