import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueryUtilsModule } from './query-utils/query-utils.module';

@Module({
  imports: [QueryUtilsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
