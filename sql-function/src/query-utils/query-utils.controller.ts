import { Controller } from '@nestjs/common';
import { JoinOptions, QueryUtilsService } from './query-utils.service';

@Controller('query-utils')
export class QueryUtilsController {
  constructor(private readonly queryUtilsService: QueryUtilsService) {}

  innerJoin<L, R>(
    leftTable: L[],
    rightTable: R[],
    joinOptions: JoinOptions,
  ): (L & R)[] {
    return this.queryUtilsService.innerJoin(leftTable, rightTable, joinOptions);
  }

  leftJoin<L, R>(
    leftTable: L[],
    rightTable: R[],
    joinOptions: JoinOptions,
  ): (L & Partial<R>)[] {
    return this.queryUtilsService.leftJoin(leftTable, rightTable, joinOptions);
  }

  crossJoin<L, R>(leftTable: L[], rightTable: R[]): (L & R)[] {
    return this.queryUtilsService.crossJoin(leftTable, rightTable);
  }

  where<T>(table: T[], conditions: (record: T) => boolean): T[] {
    return this.queryUtilsService.where(table, conditions);
  }
}
