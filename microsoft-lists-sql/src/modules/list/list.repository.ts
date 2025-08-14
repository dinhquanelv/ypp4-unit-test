import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { List } from '../../entities/list.entity';
import { FindAllListDto } from './dto/find-all-list.dto';
import { FindRecentListsDto } from './dto/find-recent-list.dto';
import { FindOneListDto } from './dto/find-one-list.dto';

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
