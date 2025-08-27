import { Controller, getControllerMetadata } from './controller.decorator';

@Controller('users')
class UserController {}

describe('Controller Decorator', () => {
  it('should return controller metadata', () => {
    const metadata: string = getControllerMetadata(UserController);

    expect(metadata).toEqual('/users');
  });
});
