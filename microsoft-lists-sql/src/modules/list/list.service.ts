import { Injectable } from '@nestjs/common';

import { ListRepository } from './list.repository';
import { ListDto } from './dto/list.dto';

@Injectable()
export class ListService {
  constructor(private readonly listRepository: ListRepository) {}

  async searchByName(
    input: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<ListDto[]> {
    return await this.listRepository.searchByName(input, pageNumber, pageSize);
  }

  async findFavoritesByAccountId(accountId: number): Promise<ListDto[]> {
    return await this.listRepository.findFavoritesByAccountId(accountId);
  }

  async findRecentByAccountId(accountId: number): Promise<ListDto[]> {
    return await this.listRepository.findRecentByAccountId(accountId);
  }

  async findAllByAccountId(accountId: number): Promise<ListDto[]> {
    return await this.listRepository.findAllByAccountId(accountId);
  }

  async findOneById(
    accountId: number,
    listId: number,
  ): Promise<ListDto | null> {
    return await this.listRepository.findOneById(accountId, listId);
  }
}
