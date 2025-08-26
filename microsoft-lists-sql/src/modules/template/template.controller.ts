import { Controller } from '@nestjs/common';

import { TemplateService } from './template.service';
import { TemplateDto } from './dto/template.dto';
import { TemplateDetailDto } from './dto/template-detail.dto';
import { ColumnDto } from './dto/column.dto';
import { SampleCellValue } from './dto/sample-cell-value.dto';
import { ViewDto } from './dto/view.dto';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  async findAllByProviderId(providerId: number): Promise<TemplateDto[]> {
    return await this.templateService.findAllByProviderId(providerId);
  }

  async findOne(templateId: number): Promise<TemplateDetailDto | null> {
    return await this.templateService.findOne(templateId);
  }

  async findAllColumns(listTemplateId: number): Promise<ColumnDto[]> {
    return await this.templateService.findAllColumns(listTemplateId);
  }

  async findAllCellValues(listTemplateId: number): Promise<SampleCellValue[]> {
    return await this.templateService.findAllCellValues(listTemplateId);
  }

  async findAllViews(listTemplateId: number): Promise<ViewDto[]> {
    return await this.templateService.findAllViews(listTemplateId);
  }
}
