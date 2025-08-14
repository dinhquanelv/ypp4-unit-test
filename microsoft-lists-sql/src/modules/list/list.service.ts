import { Injectable } from '@nestjs/common';

import { ListRepository } from '../../modules/list/list.repository';
import { FindAllListDto } from '../../modules/list/dto/find-all-list.dto';
import { FindRecentListsDto } from '../../modules/list/dto/find-recent-list.dto';
import { FindOneListDto } from '../../modules/list/dto/find-one-list.dto';

@Injectable()
export class ListService {
  constructor(private readonly listRepository: ListRepository) {}

  async searchAllListsByName(
    input: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<FindAllListDto[]> {
    return await this.listRepository.searchAllListsByName(
      input,
      pageNumber,
      pageSize,
    );
  }

  async findFavoriteListsByAccountId(
    accountId: number,
  ): Promise<FindAllListDto[]> {
    return await this.listRepository.findFavoriteListsByAccountId(accountId);
  }

  async findRecentListsByAccountId(
    accountId: number,
  ): Promise<FindRecentListsDto[]> {
    return await this.listRepository.findRecentListsByAccountId(accountId);
  }

  async findAllListsByAccountId(accountId: number): Promise<FindAllListDto[]> {
    return await this.listRepository.findAllListsByAccountId(accountId);
  }

  async findOneListById(
    accountId: number,
    listId: number,
  ): Promise<FindOneListDto | null> {
    return await this.listRepository.findOneListById(accountId, listId);
  }
}
