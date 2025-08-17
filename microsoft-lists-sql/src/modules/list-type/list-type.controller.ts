import { Controller } from '@nestjs/common';

import { ListTypeService } from './list-type.service';
import { FindListTypeDto } from './dto/find-list-type.dto';

@Controller('list-type')
export class ListTypeController {
  constructor(private readonly listTypeService: ListTypeService) {}

  async findAll(): Promise<FindListTypeDto[]> {
    return await this.listTypeService.findAll();
  }

  async findOne(listTypeId: number): Promise<FindListTypeDto | null> {
    return await this.listTypeService.findOne(listTypeId);
  }
}
