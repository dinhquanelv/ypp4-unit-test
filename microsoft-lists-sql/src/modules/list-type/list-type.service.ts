import { Injectable } from '@nestjs/common';

import { FindAllListTypeDto } from './dto/find-all-list-type.dto';
import { FindOneListTypeDto } from './dto/find-one-list-type.dto';
import { ListTypeRepository } from './list-type.repository';

@Injectable()
export class ListTypeService {
  constructor(private readonly listTypeRepository: ListTypeRepository) {}

  async findAllListType(): Promise<FindAllListTypeDto[]> {
    return await this.listTypeRepository.findAllListType();
  }

  async findOneListType(
    listTypeId: number,
  ): Promise<FindOneListTypeDto | null> {
    return await this.listTypeRepository.findOneListType(listTypeId);
  }
}
