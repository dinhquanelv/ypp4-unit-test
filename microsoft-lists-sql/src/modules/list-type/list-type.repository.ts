import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListType } from '../../entities/list-type.entity';
import { ListTypeDto } from './dto/list-type.dto';
import { CacheService } from '../../utils/cache.service';

@Injectable()
export class ListTypeRepository {
  constructor(
    @InjectRepository(ListType)
    private readonly listTypeRepository: Repository<ListType>,
    private readonly cacheService: CacheService,
  ) {}

  async findAll(): Promise<ListTypeDto[]> {
    const cacheKey = `listTypes:all`;
    const cached = this.cacheService.get<ListTypeDto[]>(cacheKey);

    if (cached) {
      return cached;
    }

    await this.listTypeRepository.query(`PRAGMA read_uncommitted = 1`);
    const query: ListTypeDto[] = await this.listTypeRepository.query(
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

    this.cacheService.set(cacheKey, query);

    return query;
  }

  async findOne(listTypeId: number): Promise<ListTypeDto | null> {
    const cacheKey = `listTypes:${listTypeId}`;
    const cached = this.cacheService.get<ListTypeDto>(cacheKey);

    if (cached) {
      return cached;
    }

    await this.listTypeRepository.query(`PRAGMA read_uncommitted = 1`);
    const list: ListTypeDto[] = await this.listTypeRepository.query(
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

    this.cacheService.set(cacheKey, list[0]);

    return list.length > 0 ? list[0] : null;
  }
}
