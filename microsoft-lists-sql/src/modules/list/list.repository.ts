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

  async searchAllListsByName(
    input: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<FindAllListDto[]> {
    const offset = (pageNumber - 1) * pageSize;
    const lists: FindAllListDto[] = await this.listRepository.query(
      `
        SELECT 
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
    const lists: FindAllListDto[] = await this.listRepository.query(
      `
        SELECT
          l.Id AS listId,
          l.Icon AS icon,
          l.Color AS color,
          w.WorkspaceName AS workspaceName,
          l.ListName AS listName
        FROM
          List l
          JOIN FavoriteList fl ON fl.Id = l.Id
          JOIN Account a ON a.Id = fl.ListId
          JOIN Workspace w ON w.Id = l.WorkspaceId
        WHERE
          a.Id = ?
    `,
      [accountId],
    );
    return lists;
  }

  async findRecentListsByAccountId(
    accountId: number,
  ): Promise<FindRecentListsDto[]> {
    const lists: FindRecentListsDto[] = await this.listRepository.query(
      `
        SELECT
          l.Id AS listId,
          l.Color AS color,
          l.Icon AS icon,
          l.ListName AS listName,
          w.WorkspaceName AS workspaceName,
          l.AccessedAt AS accessedAt
        FROM
          List l
          JOIN AccountList al ON al.ListId = l.Id
          JOIN Account a ON a.Id = al.AccountId
          JOIN Workspace w ON w.Id = l.WorkspaceId
        WHERE
          a.Id = ?
        ORDER BY
          l.AccessedAt DESC
        `,
      [accountId],
    );
    return lists;
  }

  async findAllListsByAccountId(accountId: number): Promise<FindAllListDto[]> {
    const lists: FindAllListDto[] = await this.listRepository.query(
      `
        SELECT
          l.Id AS listId,
          l.Color AS color,
          l.Icon AS icon,
          l.ListName AS listName,
          w.WorkspaceName AS workspaceName
        FROM
          List l
          JOIN AccountList al ON al.ListId = l.Id
          JOIN Account a ON a.Id = al.AccountId
          JOIN Workspace w ON w.Id = l.WorkspaceId
        WHERE
          a.Id = ?
        ORDER BY
          l.CreatedAt DESC
        `,
      [accountId],
    );
    return lists;
  }

  async findAllListType(): Promise<FindAllListTypeDto[]> {
    const lists: FindAllListTypeDto[] = await this.listRepository.query(
      `
        SELECT
          Id AS id,
          Icon AS icon,
          Title AS title,
          ListTypeDescription AS listTypeDescription
        FROM
          ListType
        `,
    );
    return lists;
  }

  async findOneListType(
    listTypeId: number,
  ): Promise<FindOneListTypeDto | null> {
    const list: FindOneListTypeDto[] = await this.listRepository.query(
      `
        SELECT
          Id AS listTypeId,
          Title AS title,
          ListTypeDescription AS listTypeDescription,
          HeaderImage AS headerImage
        FROM
          ListType
        WHERE
          Id = ?
        `,
      [listTypeId],
    );
    return list.length > 0 ? list[0] : null;
  }

  async findOneListById(
    accountId: number,
    listId: number,
  ): Promise<FindOneListDto | null> {
    const list: FindOneListDto[] = await this.listRepository.query(
      `
        SELECT
          l.Id AS listId,
          l.Icon AS icon,
          l.Color AS color,
          w.WorkspaceName AS workspaceName,
          l.ListName AS listName,
          CASE
            WHEN fl.Id IS NOT NULL THEN 1
            ELSE 0
          END AS isFavoriteList
        FROM
          List l
          JOIN Account a ON a.Id = ?
          JOIN Workspace w ON w.Id = l.WorkspaceId
          LEFT JOIN FavoriteList fl ON fl.ListId = l.Id
          AND fl.FavoredBy = ?
        WHERE
          l.Id = ?
        `,
      [accountId, accountId, listId],
    );
    return list.length > 0 ? list[0] : null;
  }
}
