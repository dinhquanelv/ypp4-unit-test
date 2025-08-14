import { Injectable } from '@nestjs/common';

import { TemplateRepository } from './template.repository';
import { FindAllByProviderIdDto } from './dto/find-all-by-provider-id.dto';
import { FindOneTemplateByIdDto } from './dto/find-one-template-by-id.dto';
import { FindAllColumnsByListTemplateIdDto } from './dto/find-all-columns-by-list-template-id.dto';
import { FindAllTemplateSampleCellValuesByListTemplateIdDto } from './dto/find-all-template-sample-cell-values-by-list-template-id.dto';
import { FindAllViewsByListTemplateIdDto } from './dto/find-all-views-by-list-template-id.dto';

@Injectable()
export class TemplateService {
  constructor(private readonly templateRepository: TemplateRepository) {}

  async findAllByProviderId(
    providerId: number,
  ): Promise<FindAllByProviderIdDto[]> {
    return await this.templateRepository.findAllByProviderId(providerId);
  }

  async findOneTemplateById(
    templateId: number,
  ): Promise<FindOneTemplateByIdDto | null> {
    return await this.templateRepository.findOneTemplateById(templateId);
  }

  async findAllColumnsByListTemplateId(
    listTemplateId: number,
  ): Promise<FindAllColumnsByListTemplateIdDto[]> {
    return await this.templateRepository.findAllColumnsByListTemplateId(
      listTemplateId,
    );
  }

  async findAllTemplateSampleCellValuesByListTemplateId(
    listTemplateId: number,
  ): Promise<FindAllTemplateSampleCellValuesByListTemplateIdDto[]> {
    return await this.templateRepository.findAllTemplateSampleCellValuesByListTemplateId(
      listTemplateId,
    );
  }

  async findAllViewsByListTemplateId(
    listTemplateId: number,
  ): Promise<FindAllViewsByListTemplateIdDto[]> {
    return await this.templateRepository.findAllViewsByListTemplateId(
      listTemplateId,
    );
  }
}
