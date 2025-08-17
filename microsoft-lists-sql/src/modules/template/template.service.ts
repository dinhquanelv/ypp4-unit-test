import { Injectable } from '@nestjs/common';

import { TemplateRepository } from './template.repository';
import { TemplateDto } from './dto/template.dto';
import { TemplateDetailDto } from './dto/template-detail.dto';
import { ColumnDto } from './dto/column.dto';
import { SampleCellValue } from './dto/sample-cell-value.dto';
import { ViewDto } from './dto/view.dto';

@Injectable()
export class TemplateService {
  constructor(private readonly templateRepository: TemplateRepository) {}

  async findAllByProviderId(providerId: number): Promise<TemplateDto[]> {
    return await this.templateRepository.findAllByProviderId(providerId);
  }

  async findOne(templateId: number): Promise<TemplateDetailDto | null> {
    return await this.templateRepository.findOne(templateId);
  }

  async findAllColumns(listTemplateId: number): Promise<ColumnDto[]> {
    return await this.templateRepository.findAllColumns(listTemplateId);
  }

  async findAllCellValues(listTemplateId: number): Promise<SampleCellValue[]> {
    return await this.templateRepository.findAllCellValues(listTemplateId);
  }

  async findAllViews(listTemplateId: number): Promise<ViewDto[]> {
    return await this.templateRepository.findAllViews(listTemplateId);
  }
}
