import { Controller } from '@nestjs/common';

import { ListService } from './list.service';
import { ListDto } from './dto/list.dto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  async searchByName(
    input: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<ListDto[]> {
    return await this.listService.searchByName(input, pageNumber, pageSize);
  }

  async findFavoritesByAccountId(accountId: number): Promise<ListDto[]> {
    return await this.listService.findFavoritesByAccountId(accountId);
  }

  async findRecentByAccountId(accountId: number): Promise<ListDto[]> {
    return await this.listService.findRecentByAccountId(accountId);
  }

  async findAllByAccountId(accountId: number): Promise<ListDto[]> {
    return await this.listService.findAllByAccountId(accountId);
  }

  async findOneById(
    accountId: number,
    listId: number,
  ): Promise<ListDto | null> {
    return await this.listService.findOneById(accountId, listId);
  }
}
