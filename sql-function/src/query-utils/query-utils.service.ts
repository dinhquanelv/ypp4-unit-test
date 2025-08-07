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
}
