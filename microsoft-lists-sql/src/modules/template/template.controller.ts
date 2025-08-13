import { Controller } from '@nestjs/common';

import { TemplateService } from './template.service';
import { FindByProviderIdDto } from '../../modules/template/dto/find-by-provider-id.dto';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  async findByProviderId(providerId: number): Promise<FindByProviderIdDto[]> {
    return await this.templateService.findByProviderId(providerId);
  }
}
