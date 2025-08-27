import 'reflect-metadata';
import { ClassType, ModuleMetadata } from '../../common/types';
import { MODULE_METADATA } from '../../common/constants';

export const Module =
  (moduleMetadata: ModuleMetadata) => (target: ClassType) => {
    Reflect.defineMetadata(MODULE_METADATA, moduleMetadata, target);
  };

export const getModuleMetadata = (target: ClassType) => {
  return Reflect.getMetadata(MODULE_METADATA, target) as ModuleMetadata;
};
