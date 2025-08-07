import { Controller } from '@nestjs/common';
import { JoinOptions, QueryUtilsService } from './query-utils.service';

@Controller('query-utils')
export class QueryUtilsController {
  constructor(private readonly queryUtilsService: QueryUtilsService) {}

  innerJoin(
    leftTable: Record<string, unknown>[],
    rightTable: Record<string, unknown>[],
    joinOptions: JoinOptions,
  ): Record<string, unknown>[] {
    return this.queryUtilsService.innerJoin(leftTable, rightTable, joinOptions);
  }

  leftJoin(
    leftTable: Record<string, unknown>[],
    rightTable: Record<string, unknown>[],
    joinOptions: JoinOptions,
  ): Record<string, unknown>[] {
    return this.queryUtilsService.leftJoin(leftTable, rightTable, joinOptions);
  }

  crossJoin(
    leftTable: Record<string, unknown>[],
    rightTable: Record<string, unknown>[],
  ): Record<string, unknown>[] {
    return this.queryUtilsService.crossJoin(leftTable, rightTable);
  }

  where(
    table: Record<string, unknown>[],
    conditions: (record: Record<string, unknown>) => boolean,
  ): Record<string, unknown>[] {
    return this.queryUtilsService.where(table, conditions);
  }
}
