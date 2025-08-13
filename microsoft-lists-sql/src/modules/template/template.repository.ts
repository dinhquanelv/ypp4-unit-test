import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListTemplate } from '../../entities/list-template.entity';
import { FindAllByProviderIdDto } from './dto/find-all-by-provider-id.dto';

@Injectable()
export class TemplateRepository {
  constructor(
    @InjectRepository(ListTemplate)
    private readonly listTemplateRepository: Repository<ListTemplate>,
  ) {}

  async findAllByProviderId(
    providerId: number,
  ): Promise<FindAllByProviderIdDto[]> {
    const templates: FindAllByProviderIdDto[] =
      await this.listTemplateRepository.query(
        `
          SELECT 
            Id as id, 
            Title as title, 
            HeaderImage as headerImage, 
            TemplateDescription as templateDescription
          FROM 
            ListTemplate 
          WHERE 
            TemplateProviderId = ?`,
        [providerId],
      );

    return templates;
  }
}
