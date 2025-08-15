import { Injectable } from '@nestjs/common';

import { ListViewRepository } from './list-view.repository';
import { FindAllViewsByListIdDto } from './dto/find-all-views-by-list-id.dto';
import { FindAllViewTypesDto } from './dto/find-all-view-types.dto';
import { FindOneViewByIdDto } from './dto/find-one-view-by-id.dto';

@Injectable()
export class ListViewService {
  constructor(private readonly listViewRepository: ListViewRepository) {}

  async findAllViewsByListId(
    listId: number,
  ): Promise<FindAllViewsByListIdDto[]> {
    return await this.listViewRepository.findAllViewsByListId(listId);
  }

  async findAllViewTypes(): Promise<FindAllViewTypesDto[]> {
    return await this.listViewRepository.findAllViewTypes();
  }

  async findOneViewById(
    listViewId: number,
  ): Promise<FindOneViewByIdDto | null> {
    return await this.listViewRepository.findOneViewById(listViewId);
  }
}
