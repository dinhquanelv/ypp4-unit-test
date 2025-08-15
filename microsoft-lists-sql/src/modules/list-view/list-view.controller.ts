import { Controller } from '@nestjs/common';

import { ListViewService } from './list-view.service';
import { FindAllViewsByListIdDto } from './dto/find-all-views-by-list-id.dto';
import { FindAllViewTypesDto } from './dto/find-all-view-types.dto';
import { FindOneViewByIdDto } from './dto/find-one-view-by-id.dto';

@Controller('list-view')
export class ListViewController {
  constructor(private readonly listViewService: ListViewService) {}

  async findAllViewsByListId(
    listId: number,
  ): Promise<FindAllViewsByListIdDto[]> {
    return await this.listViewService.findAllViewsByListId(listId);
  }

  async findAllViewTypes(): Promise<FindAllViewTypesDto[]> {
    return await this.listViewService.findAllViewTypes();
  }

  async findOneViewById(
    listViewId: number,
  ): Promise<FindOneViewByIdDto | null> {
    return await this.listViewService.findOneViewById(listViewId);
  }
}
