import 'reflect-metadata';
import { ClassType } from '../../common/types';
import { PREFIX_METADATA } from '../../common/constants';

export const Controller = (prefix: string) => (target: ClassType) => {
  // format path. ex: user -> /user | /user -> /user | //user -> /user
  const formatPrefix = prefix.replace(/^\/?/, '/');

  Reflect.defineMetadata(PREFIX_METADATA, formatPrefix, target);
};
