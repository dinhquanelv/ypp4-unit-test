import { Injectable } from '@nestjs/common';

import { TrashItemRepository } from './trash-item.repository';
import { TrashItemDto } from './dto/trash-item.dto';
import { SortOrderEnum } from '../../common/enums/sort-order.enum';

@Injectable()
export class TrashItemService {
  constructor(private readonly trashItemRepository: TrashItemRepository) {}

  async findAll(
    sortBy?: keyof TrashItemDto,
    order?: SortOrderEnum,
  ): Promise<TrashItemDto[]> {
    return await this.trashItemRepository.findAll(sortBy, order);
  }
}
