import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { List } from '../../entities/list.entity';
import { FindAllListDto } from '../../modules/list/dto/find-all-list.dto';
import { FindRecentListsDto } from '../../modules/list/dto/find-recent-list.dto';
import { FindAllListTypeDto } from '../../modules/list/dto/find-all-list-type.dto';
import { FindOneListTypeDto } from '../../modules/list/dto/find-one-list-type.dto';
import { FindOneListDto } from '../../modules/list/dto/find-one-list.dto';

@Injectable()
export class ListRepository {
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
  ) {}

  async searchAllListsByName(input: string): Promise<FindAllListDto[] | null> {
    return null;
  }

  async findFavoriteListsByAccountId(
    accountId: number,
  ): Promise<FindAllListDto[] | null> {
    return null;
  }

  async findRecentListsByAccountId(
    accountId: number,
  ): Promise<FindRecentListsDto[] | null> {
    return null;
  }

  async findAllListsByAccountId(
    accountId: number,
  ): Promise<FindAllListDto[] | null> {
    return null;
  }

  async findAllListType(): Promise<FindAllListTypeDto[] | null> {
    return null;
  }

  async findOneListType(
    listTypeId: number,
  ): Promise<FindOneListTypeDto | null> {
    return null;
  }

  async findOneList(id: number): Promise<FindOneListDto | null> {
    return null;
  }
}
