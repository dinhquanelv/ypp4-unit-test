import 'reflect-metadata';
import { PARAM_METADATA_KEY } from '../../common/constants';
import { ParamType } from '../../common/enums';
import { ParameterDecorator, ParamMetadata } from '../../common/types';

export const createParameterDecorator =
  (type: ParamType) =>
  (key?: string): ParameterDecorator =>
  (target, propertyKey, parameterIndex) => {
    const metadata: ParamMetadata[] =
      (Reflect.getMetadata(
        PARAM_METADATA_KEY,
        target,
        propertyKey,
      ) as ParamMetadata[]) || [];

    metadata.push({ type, key, index: parameterIndex });

    Reflect.defineMetadata(PARAM_METADATA_KEY, metadata, target, propertyKey);
  };

export const getParameterMetadata = (target: object, propertyKey: string) => {
  return Reflect.getMetadata(
    PARAM_METADATA_KEY,
    target,
    propertyKey,
  ) as ParamMetadata[];
};

export const Param = createParameterDecorator(ParamType.Param);
export const Query = createParameterDecorator(ParamType.Query);
export const Body = createParameterDecorator(ParamType.Body);
