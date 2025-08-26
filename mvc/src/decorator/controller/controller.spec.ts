import { RouteMetadata } from '../../types';
import { Controller } from './controller.decorator';

@Controller('users')
class UserController {}

describe('Controller Decorator', () => {
  it('should return metadata of prefix', () => {
    const metadata: RouteMetadata[] = Reflect.getMetadata(
      'prefix',
      UserController,
    ) as RouteMetadata[];

    expect(metadata).toEqual('/users');
  });
});
