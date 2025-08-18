import { Controller } from '@nestjs/common';

import { ListViewService } from './list-view.service';
import { ViewDto } from './dto/view.dto';
import { ViewTypeDto } from './dto/view-type.dto';
import { ViewSettingDto } from './dto/view-setting.dto';
import { ViewTypeEnum } from '../../common/enums/view-type.enum';

@Controller('list-view')
export class ListViewController {
  constructor(private readonly listViewService: ListViewService) {}

  async findAllByListId(listId: number): Promise<ViewDto[]> {
    return await this.listViewService.findAllByListId(listId);
  }

  async findAllTypes(): Promise<ViewTypeDto[]> {
    return await this.listViewService.findAllTypes();
  }

  async findAllSettingsByType(
    typeName: ViewTypeEnum,
  ): Promise<ViewSettingDto[]> {
    return await this.listViewService.findAllSettingsByType(typeName);
  }
}
