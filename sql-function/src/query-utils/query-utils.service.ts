import { Injectable } from '@nestjs/common';

export interface JoinOptions {
  leftKey: string;
  rightKey: string;
}

@Injectable()
export class QueryUtilsService {
  innerJoin(
    leftTable: Record<string, unknown>[],
    rightTable: Record<string, unknown>[],
    options: JoinOptions,
  ): Record<string, unknown>[] {
    const result: Record<string, unknown>[] = [];

    for (const left of leftTable) {
      for (const right of rightTable) {
        if (left[options.leftKey] === right[options.rightKey]) {
          result.push({ ...left, ...right });
        }
      }
    }

    return result;
  }

  leftJoin(
    leftTable: Record<string, unknown>[],
    rightTable: Record<string, unknown>[],
    options: JoinOptions,
  ): Record<string, unknown>[] {
    const result: Record<string, unknown>[] = [];

    for (const left of leftTable) {
      let matchFound = false;

      for (const right of rightTable) {
        if (left[options.leftKey] === right[options.rightKey]) {
          result.push({ ...left, ...right });
          matchFound = true;
        }
      }

      if (!matchFound) {
        result.push({ ...left, [options.rightKey]: null });
      }
    }

    return result;
  }

  rightJoin(
    leftTable: Record<string, unknown>[],
    rightTable: Record<string, unknown>[],
    options: JoinOptions,
  ): Record<string, unknown>[] {
    const result: Record<string, unknown>[] = [];

    for (const right of rightTable) {
      let matchFound = false;

      for (const left of leftTable) {
        if (left[options.leftKey] === right[options.rightKey]) {
          result.push({ ...left, ...right });
          matchFound = true;
        }
      }

      if (!matchFound) {
        result.push({ [options.leftKey]: null, ...right });
      }
    }

    return result;
  }
}
