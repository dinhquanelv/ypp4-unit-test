import { Injectable } from '@nestjs/common';

export interface JoinOptions {
  leftKey: string;
  rightKey: string;
}

@Injectable()
export class QueryUtilsService {
  innerJoin<L, R>(
    leftTable: L[],
    rightTable: R[],
    joinOptions: JoinOptions,
  ): (L & R)[] {
    const result: (L & R)[] = [];

    for (const left of leftTable) {
      for (const right of rightTable) {
        if (left[joinOptions.leftKey] === right[joinOptions.rightKey]) {
          result.push({ ...left, ...right });
        }
      }
    }

    return result;
  }

  leftJoin<L, R>(
    leftTable: L[],
    rightTable: R[],
    joinOptions: JoinOptions,
  ): (L & Partial<R>)[] {
    const result: (L & Partial<R>)[] = [];

    for (const left of leftTable) {
      let hasMatch: boolean = false;

      for (const right of rightTable) {
        if (left[joinOptions.leftKey] === right[joinOptions.rightKey]) {
          result.push({ ...left, ...right } as L & Partial<R>);
          hasMatch = true;
        }
      }

      if (!hasMatch) {
        result.push({
          ...left,
          [joinOptions.rightKey]: null,
        } as L & Partial<R>);
      }
    }

    return result;
  }

  crossJoin<L, R>(leftTable: L[], rightTable: R[]): (L & R)[] {
    const result: (L & R)[] = [];

    if (leftTable.length === 0 || rightTable.length === 0) {
      return result;
    }

    for (const left of leftTable) {
      for (const right of rightTable) {
        result.push({ ...left, ...right });
      }
    }

    return result;
  }

  where<T>(table: T[], conditions: (record: T) => boolean): T[] {
    const result: T[] = [];

    for (const record of table) {
      if (conditions(record)) {
        result.push(record);
      }
    }

    return result;
  }
}
