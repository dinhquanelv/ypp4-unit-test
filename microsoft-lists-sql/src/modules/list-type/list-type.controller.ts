import { Controller } from '@nestjs/common';

import { ListTypeService } from './list-type.service';
import { ListTypeDto } from './dto/list-type.dto';

@Controller('list-type')
export class ListTypeController {
  constructor(private readonly listTypeService: ListTypeService) {}

  async findAll(): Promise<ListTypeDto[]> {
    return await this.listTypeService.findAll();
  }

  async findOne(listTypeId: number): Promise<ListTypeDto | null> {
    return await this.listTypeService.findOne(listTypeId);
  }
}
