export type ClassType<T = unknown> = new (...args: unknown[]) => T;

export interface RouteMetadata {
  method: string;
  path: string;
  handler: string;
}
