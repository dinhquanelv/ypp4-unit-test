import 'reflect-metadata';
import { ClassType } from '../../types';

export const Controller = (prefix: string) => (target: ClassType) => {
  // format path. ex: user -> /user | /user -> /user | //user -> /user
  const formatPrefix = prefix.replace(/^\/?/, '/');

  Reflect.defineMetadata('prefix', formatPrefix, target);
};
