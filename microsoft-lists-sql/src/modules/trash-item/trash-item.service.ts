import { Injectable } from '@nestjs/common';

import { TrashItemRepository } from './trash-item.repository';
import { TrashItemDto } from './dto/trash-item.dto';
import { SortOrder } from '../../common/enums/sort-order.enum';

@Injectable()
export class TrashItemService {
  constructor(private readonly trashItemRepository: TrashItemRepository) {}

  async findAll(
    sortBy?: keyof TrashItemDto,
    order?: SortOrder,
  ): Promise<TrashItemDto[]> {
    return await this.trashItemRepository.findAll(sortBy, order);
  }
}
