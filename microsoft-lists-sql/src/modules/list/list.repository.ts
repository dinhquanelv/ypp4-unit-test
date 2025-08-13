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

  async searchAllListsByName(input: string): Promise<FindAllListDto[]> {
    const pageNumber = 1;
    const pageSize = 24;
    const offset = (pageNumber - 1) * pageSize;
    const lists: FindAllListDto[] = await this.listRepository.query(
      `SELECT 
            l.Id AS listId,
            l.Icon AS icon,
            l.Color AS color,
            l.ListName AS listName,
            w.WorkspaceName AS workspaceName
        FROM
            List l
            JOIN Workspace w ON w.Id = l.WorkspaceId
        WHERE
            l.ListName LIKE '%' || ? || '%'
        ORDER BY
            l.ListName
        LIMIT ? OFFSET ?;
    `,
      [input, pageSize, offset],
    );

    return lists;
  }

  async findFavoriteListsByAccountId(
    accountId: number,
  ): Promise<FindAllListDto[]> {
    const lists: FindAllListDto[] = await this.listRepository.query(``);
    return lists;
  }

  async findRecentListsByAccountId(
    accountId: number,
  ): Promise<FindRecentListsDto[]> {
    const lists: FindRecentListsDto[] = await this.listRepository.query(``);
    return lists;
  }

  async findAllListsByAccountId(accountId: number): Promise<FindAllListDto[]> {
    const lists: FindAllListDto[] = await this.listRepository.query(``);
    return lists;
  }

  async findAllListType(): Promise<FindAllListTypeDto[]> {
    const lists: FindAllListTypeDto[] = await this.listRepository.query(``);
    return lists;
  }

  async findOneListType(
    listTypeId: number,
  ): Promise<FindOneListTypeDto | null> {
    const list: FindOneListTypeDto = await this.listRepository.query(``);
    return list;
  }

  async findOneListById(id: number): Promise<FindOneListDto | null> {
    const list: FindOneListDto = await this.listRepository.query(``);
    return list;
  }
}
