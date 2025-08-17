import { Controller } from '@nestjs/common';

import { ListService } from './list.service';
import { QueryListDto } from './dto/query-list.dto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  async searchByName(
    input: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<QueryListDto[]> {
    return await this.listService.searchByName(input, pageNumber, pageSize);
  }

  async findFavoritesByAccountId(accountId: number): Promise<QueryListDto[]> {
    return await this.listService.findFavoritesByAccountId(accountId);
  }

  async findRecentByAccountId(accountId: number): Promise<QueryListDto[]> {
    return await this.listService.findRecentByAccountId(accountId);
  }

  async findAllByAccountId(accountId: number): Promise<QueryListDto[]> {
    return await this.listService.findAllByAccountId(accountId);
  }

  async findOneById(
    accountId: number,
    listId: number,
  ): Promise<QueryListDto | null> {
    return await this.listService.findOneById(accountId, listId);
  }
}
