import { Injectable } from '@nestjs/common';

import { ListRepository } from '../../modules/list/list.repository';
import { FindAllListDto } from '../../modules/list/dto/find-all-list.dto';
import { FindRecentListsDto } from '../../modules/list/dto/find-recent-list.dto';
import { FindAllListTypeDto } from '../../modules/list/dto/find-all-list-type.dto';
import { FindOneListTypeDto } from '../../modules/list/dto/find-one-list-type.dto';
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

  async findAllListType(): Promise<FindAllListTypeDto[]> {
    return await this.listRepository.findAllListType();
  }

  async findOneListType(
    listTypeId: number,
  ): Promise<FindOneListTypeDto | null> {
    return await this.listRepository.findOneListType(listTypeId);
  }

  async findOneListById(
    accountId: number,
    listId: number,
  ): Promise<FindOneListDto | null> {
    return await this.listRepository.findOneListById(accountId, listId);
  }
}
