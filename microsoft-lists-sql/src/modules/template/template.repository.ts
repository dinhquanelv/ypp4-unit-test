import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListTemplate } from '../../entities/list-template.entity';
import { Repository } from 'typeorm';
import { FindByProviderIdDto } from '../../modules/template/dto/find-by-provider-id.dto';

@Injectable()
export class TemplateRepository {
  constructor(
    @InjectRepository(ListTemplate)
    private readonly listTemplateRepository: Repository<ListTemplate>,
  ) {}

  async findByProviderId(providerId: number): Promise<FindByProviderIdDto[]> {
    const query: FindByProviderIdDto[] =
      await this.listTemplateRepository.query(
        `SELECT 
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

    return query;
  }
}
