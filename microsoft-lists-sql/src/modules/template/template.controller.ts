import { Controller } from '@nestjs/common';

import { TemplateService } from './template.service';
import { FindAllByProviderIdDto } from './dto/find-all-by-provider-id.dto';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  async findAllByProviderId(
    providerId: number,
  ): Promise<FindAllByProviderIdDto[]> {
    return await this.templateService.findAllByProviderId(providerId);
  }
}
