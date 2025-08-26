import { ParamType } from '../enums';

export type ClassType<T = unknown> = new (...args: unknown[]) => T;

export type ParameterDecorator = (
  target: object,
  propertyKey: string | symbol,
  parameterIndex: number,
) => void;

export interface RouteMetadata {
  method: string;
  path: string;
  handler: string;
}

export interface ParamMetadata {
  type: ParamType;
  key?: string;
  index: number;
}
