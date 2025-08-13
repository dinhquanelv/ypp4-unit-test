import { Injectable } from '@nestjs/common';
import { FindByProviderIdDto } from '../../modules/template/dto/find-by-provider-id.dto';
import { TemplateRepository } from '../../modules/template/template.repository';

@Injectable()
export class TemplateService {
  constructor(private readonly templateRepository: TemplateRepository) {}

  async findByProviderId(providerId: number): Promise<FindByProviderIdDto[]> {
    return await this.templateRepository.findByProviderId(providerId);
  }
}
