import { Injectable } from '@nestjs/common';

import { ListTypeDto } from './dto/list-type.dto';
import { ListTypeRepository } from './list-type.repository';

@Injectable()
export class ListTypeService {
  constructor(private readonly listTypeRepository: ListTypeRepository) {}

  async findAll(): Promise<ListTypeDto[]> {
    return await this.listTypeRepository.findAll();
  }

  async findOne(listTypeId: number): Promise<ListTypeDto | null> {
    return await this.listTypeRepository.findOne(listTypeId);
  }
}
