import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { ListTemplate } from '../../entities/list-template.entity';
import { TemplateRepository } from './template.repository';
import { CacheService } from '../../common/utils/cache.util';

@Module({
  imports: [TypeOrmModule.forFeature([ListTemplate])],
  controllers: [TemplateController],
  providers: [TemplateService, TemplateRepository, CacheService],
})
export class TemplateModule {}
