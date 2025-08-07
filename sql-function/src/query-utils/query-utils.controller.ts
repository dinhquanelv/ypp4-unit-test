import { Controller } from '@nestjs/common';
import { JoinOptions, QueryUtilsService } from './query-utils.service';

@Controller('query-utils')
export class QueryUtilsController {
  constructor(private readonly queryUtilsService: QueryUtilsService) {}

  innerJoin(
    leftTable: Record<string, unknown>[],
    rightTable: Record<string, unknown>[],
    options: JoinOptions,
  ) {
    return this.queryUtilsService.innerJoin(leftTable, rightTable, options);
  }

  leftJoin(
    leftTable: Record<string, unknown>[],
    rightTable: Record<string, unknown>[],
    options: JoinOptions,
  ) {
    return this.queryUtilsService.leftJoin(leftTable, rightTable, options);
  }

  rightJoin(
    leftTable: Record<string, unknown>[],
    rightTable: Record<string, unknown>[],
    options: JoinOptions,
  ) {
    return this.queryUtilsService.rightJoin(leftTable, rightTable, options);
  }
}
