import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TrashItem } from '../../entities/trash-item.entity';
import { TrashItemDto } from './dto/trash-item.dto';
import { SortOrderEnum } from '../../common/enums/sort-order.enum';
import { CacheService } from '../../common/utils/cache.util';

@Injectable()
export class TrashItemRepository {
  constructor(
    @InjectRepository(TrashItem)
    private readonly trashItemRepository: Repository<TrashItem>,
    private readonly cacheService: CacheService,
  ) {}

  async findAll(
    sortBy?: keyof TrashItemDto,
    order?: SortOrderEnum,
  ): Promise<TrashItemDto[]> {
    const cacheKey = `trashItems:all${sortBy || 'default'}:${order}`;
    const cached = this.cacheService.get<TrashItemDto[]>(cacheKey);

    if (cached) return cached;

    let orderByClause = '';
    if (sortBy) {
      const field: Record<keyof TrashItemDto, string> = {
        trashItemId: 'trs.Id',
        objectName: 'ot.ObjectName',
        deletedAt: 'trs.DeleteAt',
        deletedBy: "(deletedBy.FirstName || ' ' || deletedBy.LastName)",
        createdBy: "(createdBy.FirstName || ' ' || createdBy.LastName)",
        itemPath: 'trs.PathItem',
      };

      orderByClause = `ORDER BY ${field[sortBy]} ${order}`;
    }

    await this.trashItemRepository.query(`PRAGMA read_uncommitted = 1`);
    const items: TrashItemDto[] = await this.trashItemRepository.query(
      `
      SELECT
        trs.Id AS trashItemId,
        ot.ObjectName AS objectName,
        strftime('%m/%d/%Y %H:%M', trs.DeleteAt) AS deletedAt,
        deletedBy.FirstName || ' ' || deletedBy.LastName AS deletedBy,
        createdBy.FirstName || ' ' || createdBy.LastName AS createdBy,
        trs.PathItem AS itemPath
      FROM
        TrashItem trs
        JOIN Account createdBy ON createdBy.Id = trs.CreateBy
        JOIN Account deletedBy ON deletedBy.Id = trs.DeletedBy
        JOIN ObjectType ot ON ot.Id = trs.ObjectTypeId
      ${orderByClause}
      `,
    );

    this.cacheService.set(cacheKey, items);

    return items;
  }
}
