import { Controller } from '@nestjs/common';
import { ListTypeService } from './list-type.service';

import { FindAllListTypeDto } from './dto/find-all-list-type.dto';
import { FindOneListTypeDto } from './dto/find-one-list-type.dto';

@Controller('list-type')
export class ListTypeController {
  constructor(private readonly listTypeService: ListTypeService) {}

  async findAllListType(): Promise<FindAllListTypeDto[]> {
    return await this.listTypeService.findAllListType();
  }

  async findOneListType(
    listTypeId: number,
  ): Promise<FindOneListTypeDto | null> {
    return await this.listTypeService.findOneListType(listTypeId);
  }
}
