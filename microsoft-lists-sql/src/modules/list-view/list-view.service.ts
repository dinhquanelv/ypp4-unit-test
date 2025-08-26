import { Injectable } from '@nestjs/common';

import { ListViewRepository } from './list-view.repository';
import { ViewDto } from './dto/view.dto';
import { ViewTypeDto } from './dto/view-type.dto';
import { ViewSettingDto } from './dto/view-setting.dto';
import { ViewTypeEnum } from '../../common/enums/view-type.enum';

@Injectable()
export class ListViewService {
  constructor(private readonly listViewRepository: ListViewRepository) {}

  async findAllByListId(listId: number): Promise<ViewDto[]> {
    return await this.listViewRepository.findAllByListId(listId);
  }

  async findAllTypes(): Promise<ViewTypeDto[]> {
    return await this.listViewRepository.findAllTypes();
  }

  async findAllSettingsByType(
    typeName: ViewTypeEnum,
  ): Promise<ViewSettingDto[]> {
    return await this.listViewRepository.findAllSettingsByType(typeName);
  }
}
