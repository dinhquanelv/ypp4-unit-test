import 'reflect-metadata';
import { getModuleMetadata, Module } from './module.decorator';
import { ModuleMetadata } from '../../common/types';

class TestController {}

class TestService {}

class TestRepository {}

@Module({
  controllers: [TestController],
  providers: [TestService, TestRepository],
})
class TestModule {}

describe('Module decorator', () => {
  it('should define a module with controllers and providers', () => {
    const metadata: ModuleMetadata = getModuleMetadata(TestModule);

    expect(metadata).toEqual({
      controllers: [TestController],
      providers: [TestService, TestRepository],
    });
  });
});
