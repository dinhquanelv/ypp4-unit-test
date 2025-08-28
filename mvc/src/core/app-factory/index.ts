import 'reflect-metadata';
import { ClassType, ModuleMetadata } from '../../common/types';
import { getModuleMetadata } from '../../decorator/module/module.decorator';
import { Container } from '../di/container';

export class AppFactory {
  private modules = new Map<ClassType, any>();
  private controllers: any[] = [];

  static async create(rootModule: ClassType) {
    const app = new AppFactory();
    await app.init(rootModule);
    return app;
  }

  private async init(rootModule: ClassType) {
    const moduleMetadata: ModuleMetadata = getModuleMetadata(rootModule);
    if (!moduleMetadata) {
      throw new Error('Module metadata not found');
    }

    // register providers
    moduleMetadata.providers?.forEach((provider: ClassType) => {
      Container.register(provider);
    });

    // register controllers
    moduleMetadata.controllers?.forEach((controller: ClassType) => {
      Container.register(controller);
    });

    // resolve provider instances
    const providerInstances = new Map<ClassType, any>();
    moduleMetadata.providers?.forEach((provider: ClassType) => {
      const instance = Container.resolve(provider);
      providerInstances.set(provider, instance);
    });

    // resolve controller instances
    const controllerInstances: any[] =
      moduleMetadata.controllers?.map((controller: ClassType) => {
        return Container.resolve(controller);
      }) || [];

    controllerInstances.forEach((instance) => {
      this.controllers.push(instance);
    });
  }
}
