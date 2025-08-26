import { PREFIX_METADATA } from '../../common/constants';
import { RouteMetadata } from '../../common/types';
import { Controller } from './controller.decorator';

@Controller('users')
class UserController {}

describe('Controller Decorator', () => {
  it('should return metadata of prefix', () => {
    const metadata: RouteMetadata[] = Reflect.getMetadata(
      PREFIX_METADATA,
      UserController,
    ) as RouteMetadata[];

    expect(metadata).toEqual('/users');
  });
});
