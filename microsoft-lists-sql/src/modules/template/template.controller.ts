import { Controller } from '@nestjs/common';

import { TemplateService } from './template.service';
import { FindAllByProviderIdDto } from './dto/find-all-by-provider-id.dto';
import { FindOneTemplateByIdDto } from './dto/find-one-template-by-id.dto';
import { FindAllColumnsByListTemplateIdDto } from './dto/find-all-columns-by-list-template-id.dto';
import { FindAllTemplateSampleCellValuesByListTemplateIdDto } from './dto/find-all-template-sample-cell-values-by-list-template-id.dto';
import { FindAllViewsByListTemplateIdDto } from './dto/find-all-views-by-list-template-id.dto';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  async findAllByProviderId(
    providerId: number,
  ): Promise<FindAllByProviderIdDto[]> {
    return await this.templateService.findAllByProviderId(providerId);
  }

  async findOneTemplateById(
    templateId: number,
  ): Promise<FindOneTemplateByIdDto | null> {
    return await this.templateService.findOneTemplateById(templateId);
  }

  async findAllColumnsByListTemplateId(
    listTemplateId: number,
  ): Promise<FindAllColumnsByListTemplateIdDto[]> {
    return await this.templateService.findAllColumnsByListTemplateId(
      listTemplateId,
    );
  }

  async findAllTemplateSampleCellValuesByListTemplateId(
    listTemplateId: number,
  ): Promise<FindAllTemplateSampleCellValuesByListTemplateIdDto[]> {
    return await this.templateService.findAllTemplateSampleCellValuesByListTemplateId(
      listTemplateId,
    );
  }

  async findAllViewsByListTemplateId(
    listTemplateId: number,
  ): Promise<FindAllViewsByListTemplateIdDto[]> {
    return await this.templateService.findAllViewsByListTemplateId(
      listTemplateId,
    );
  }
}
