import 'reflect-metadata';
import { Module } from './module.decorator';
import { ModuleMetadata } from '../../common/types';
import { MODULE_METADATA } from '../../common/constants';

class TestController {}

class TestService {}

@Module({
  controllers: [TestController],
  providers: [TestService],
})
class TestModule {}

describe('Module decorator', () => {
  it('should define a module with controllers and providers', () => {
    const metadata: ModuleMetadata = Reflect.getMetadata(
      MODULE_METADATA,
      TestModule,
    ) as ModuleMetadata;

    expect(metadata).toEqual({
      controllers: [TestController],
      providers: [TestService],
    });
  });
});
