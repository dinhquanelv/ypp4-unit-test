import { Injectable } from '@nestjs/common';

import { FindListTypeDto } from './dto/find-list-type.dto';
import { ListTypeRepository } from './list-type.repository';

@Injectable()
export class ListTypeService {
  constructor(private readonly listTypeRepository: ListTypeRepository) {}

  async findAll(): Promise<FindListTypeDto[]> {
    return await this.listTypeRepository.findAll();
  }

  async findOne(listTypeId: number): Promise<FindListTypeDto | null> {
    return await this.listTypeRepository.findOne(listTypeId);
  }
}
