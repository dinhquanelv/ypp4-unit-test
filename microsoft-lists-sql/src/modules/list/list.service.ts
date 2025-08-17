import { Injectable } from '@nestjs/common';

import { ListRepository } from './list.repository';
import { QueryListDto } from './dto/query-list.dto';

@Injectable()
export class ListService {
  constructor(private readonly listRepository: ListRepository) {}

  async searchByName(
    input: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<QueryListDto[]> {
    return await this.listRepository.searchByName(input, pageNumber, pageSize);
  }

  async findFavoritesByAccountId(accountId: number): Promise<QueryListDto[]> {
    return await this.listRepository.findFavoritesByAccountId(accountId);
  }

  async findRecentByAccountId(accountId: number): Promise<QueryListDto[]> {
    return await this.listRepository.findRecentByAccountId(accountId);
  }

  async findAllByAccountId(accountId: number): Promise<QueryListDto[]> {
    return await this.listRepository.findAllByAccountId(accountId);
  }

  async findOneById(
    accountId: number,
    listId: number,
  ): Promise<QueryListDto | null> {
    return await this.listRepository.findOneById(accountId, listId);
  }
}
