import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { List } from '../../entities/list.entity';
import { ListDto } from './dto/list.dto';
import { CacheService } from '../../utils/cache.service';

@Injectable()
export class ListRepository {
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
    private readonly cacheService: CacheService,
  ) {}

  async searchByName(
    input: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<ListDto[]> {
    const offset = (pageNumber - 1) * pageSize;

    await this.listRepository.query(`PRAGMA read_uncommitted = 1`);
    const lists: ListDto[] = await this.listRepository.query(
      `
        SELECT 
          l.Id AS listId,
          l.Color AS color,
          l.Icon AS icon,
          w.WorkspaceName AS workspaceName,
          l.ListName AS listName
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

  async findFavoritesByAccountId(accountId: number): Promise<ListDto[]> {
    const cacheKey = `favoriteLists:${accountId}`;
    const cachedLists = this.cacheService.get<ListDto[]>(cacheKey);

    if (cachedLists) {
      return cachedLists;
    }

    await this.listRepository.query(`PRAGMA read_uncommitted = 1`);
    const lists: ListDto[] = await this.listRepository.query(
      `
        SELECT
          l.Id AS listId,
          l.Color AS color,
          l.Icon AS icon,
          l.ListName AS listName,
          w.WorkspaceName AS workspaceName
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

    this.cacheService.set(cacheKey, lists, 300);

    return lists;
  }

  async findRecentByAccountId(accountId: number): Promise<ListDto[]> {
    const cacheKey = `recentLists:${accountId}`;
    const cachedLists = this.cacheService.get<ListDto[]>(cacheKey);

    if (cachedLists) {
      return cachedLists;
    }

    await this.listRepository.query(`PRAGMA read_uncommitted = 1`);
    const lists: ListDto[] = await this.listRepository.query(
      `
        SELECT
          l.Id AS listId,
          l.Color AS color,
          l.Icon AS icon,
          w.WorkspaceName AS workspaceName,
          l.ListName AS listName,
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

    this.cacheService.set(cacheKey, lists, 300);

    return lists;
  }

  async findAllByAccountId(accountId: number): Promise<ListDto[]> {
    const cacheKey = `allLists:${accountId}`;
    const cachedLists = this.cacheService.get<ListDto[]>(cacheKey);

    if (cachedLists) {
      return cachedLists;
    }

    await this.listRepository.query(`PRAGMA read_uncommitted = 1`);
    const lists: ListDto[] = await this.listRepository.query(
      `
        SELECT
          l.Id AS listId,
          l.Color AS color,
          l.Icon AS icon,
          w.WorkspaceName AS workspaceName,
          l.ListName AS listName
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

    this.cacheService.set(cacheKey, lists, 300);

    return lists;
  }

  async findOneById(
    accountId: number,
    listId: number,
  ): Promise<ListDto | null> {
    const cacheKey = `list:${accountId}:${listId}`;
    const cachedList = this.cacheService.get<ListDto>(cacheKey);

    if (cachedList) {
      return cachedList;
    }

    await this.listRepository.query(`PRAGMA read_uncommitted = 1`);
    const list: ListDto[] = await this.listRepository.query(
      `
        SELECT
          l.Id AS listId,
          l.Color AS color,
          l.Icon AS icon,
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

    this.cacheService.set(cacheKey, list[0], 300);

    return list.length > 0 ? list[0] : null;
  }
}
