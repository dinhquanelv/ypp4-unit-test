import { HTTP_CODE_METADATA } from '../../common/constants';

export const HttpCode =
  (statusCode: number) =>
  (classTarget: object, propertyKey: string): void => {
    Reflect.defineMetadata(
      HTTP_CODE_METADATA,
      statusCode,
      classTarget,
      propertyKey,
    );
  };

export const getHttpCode = (
  classTarget: object,
  propertyKey: string,
): number | undefined => {
  return Reflect.getMetadata(HTTP_CODE_METADATA, classTarget, propertyKey) as
    | number
    | undefined;
};
