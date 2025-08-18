import { Controller } from '@nestjs/common';
import { TrashItemService } from './trash-item.service';
import { TrashItemDto } from './dto/trash-item.dto';
import { SortOrder } from '../../common/enums/sort-order.enum';

@Controller('trash-item')
export class TrashItemController {
  constructor(private readonly trashItemService: TrashItemService) {}

  async findAll(
    sortBy?: keyof TrashItemDto,
    order?: SortOrder,
  ): Promise<TrashItemDto[]> {
    return await this.trashItemService.findAll(sortBy, order);
  }
}
