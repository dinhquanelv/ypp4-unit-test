import { Controller } from '@nestjs/common';
import { JoinOptions, QueryUtilsService } from './query-utils.service';

@Controller('query-utils')
export class QueryUtilsController {
  constructor(private readonly queryUtilsService: QueryUtilsService) {}

  innerJoin(
    leftTable: Record<string, unknown>[],
    rightTable: Record<string, unknown>[],
    joinOptions: JoinOptions,
  ) {
    return this.queryUtilsService.innerJoin(leftTable, rightTable, joinOptions);
  }

  leftJoin(
    leftTable: Record<string, unknown>[],
    rightTable: Record<string, unknown>[],
    joinOptions: JoinOptions,
  ) {
    return this.queryUtilsService.leftJoin(leftTable, rightTable, joinOptions);
  }

  crossJoin(
    leftTable: Record<string, unknown>[],
    rightTable: Record<string, unknown>[],
  ) {
    return this.queryUtilsService.crossJoin(leftTable, rightTable);
  }
}
