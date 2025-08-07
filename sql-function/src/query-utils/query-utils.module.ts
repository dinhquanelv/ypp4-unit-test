import { Module } from '@nestjs/common';
import { QueryUtilsService } from './query-utils.service';
import { QueryUtilsController } from './query-utils.controller';

@Module({
  controllers: [QueryUtilsController],
  providers: [QueryUtilsService],
})
export class QueryUtilsModule {}
