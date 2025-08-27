import 'reflect-metadata';
import { ClassType, ModuleMetadata } from '../../common/types';
import { MODULE_METADATA } from '../../common/constants';

export const Module =
  (moduleMetadata: ModuleMetadata) => (target: ClassType) => {
    Reflect.defineMetadata(MODULE_METADATA, moduleMetadata, target);
  };
