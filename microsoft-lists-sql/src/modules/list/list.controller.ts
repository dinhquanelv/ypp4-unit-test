import { Controller } from '@nestjs/common';

import { ListService } from './list.service';
import { FindAllListDto } from './dto/find-all-list.dto';
import { FindRecentListsDto } from './dto/find-recent-list.dto';
import { FindOneListDto } from './dto/find-one-list.dto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  async searchAllListsByName(
    input: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<FindAllListDto[]> {
    return await this.listService.searchAllListsByName(
      input,
      pageNumber,
      pageSize,
    );
  }

  async findFavoriteListsByAccountId(
    accountId: number,
  ): Promise<FindAllListDto[]> {
    return await this.listService.findFavoriteListsByAccountId(accountId);
  }

  async findRecentListsByAccountId(
    accountId: number,
  ): Promise<FindRecentListsDto[]> {
    return await this.listService.findRecentListsByAccountId(accountId);
  }

  async findAllListsByAccountId(accountId: number): Promise<FindAllListDto[]> {
    return await this.listService.findAllListsByAccountId(accountId);
  }

  async findOneListById(
    accountId: number,
    listId: number,
  ): Promise<FindOneListDto | null> {
    return await this.listService.findOneListById(accountId, listId);
  }
}
