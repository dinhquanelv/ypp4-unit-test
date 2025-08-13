import { Injectable } from '@nestjs/common';
import { FindAllByProviderIdDto } from './dto/find-all-by-provider-id.dto';
import { TemplateRepository } from '../../modules/template/template.repository';

@Injectable()
export class TemplateService {
  constructor(private readonly templateRepository: TemplateRepository) {}

  async findAllByProviderId(
    providerId: number,
  ): Promise<FindAllByProviderIdDto[]> {
    return await this.templateRepository.findAllByProviderId(providerId);
  }
}
