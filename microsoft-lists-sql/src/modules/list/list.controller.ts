import { Controller } from '@nestjs/common';

import { ListService } from './list.service';
import { FindAllListDto } from '../../modules/list/dto/find-all-list.dto';
import { FindRecentListsDto } from '../../modules/list/dto/find-recent-list.dto';
import { FindAllListTypeDto } from '../../modules/list/dto/find-all-list-type.dto';
import { FindOneListTypeDto } from '../../modules/list/dto/find-one-list-type.dto';
import { FindOneListDto } from '../../modules/list/dto/find-one-list.dto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  async searchAllListsByName(input: string): Promise<FindAllListDto[] | null> {
    return await this.listService.searchAllListsByName(input);
  }

  async findFavoriteListsByAccountId(
    accountId: number,
  ): Promise<FindAllListDto[] | null> {
    return await this.listService.findFavoriteListsByAccountId(accountId);
  }

  async findRecentListsByAccountId(
    accountId: number,
  ): Promise<FindRecentListsDto[] | null> {
    return await this.listService.findRecentListsByAccountId(accountId);
  }

  async findAllListsByAccountId(
    accountId: number,
  ): Promise<FindAllListDto[] | null> {
    return await this.listService.findAllListsByAccountId(accountId);
  }

  async findAllListType(): Promise<FindAllListTypeDto[] | null> {
    return await this.listService.findAllListType();
  }

  async findOneListType(
    listTypeId: number,
  ): Promise<FindOneListTypeDto | null> {
    return await this.listService.findOneListType(listTypeId);
  }

  async findOneListById(id: number): Promise<FindOneListDto | null> {
    return await this.listService.findOneListById(id);
  }
}
