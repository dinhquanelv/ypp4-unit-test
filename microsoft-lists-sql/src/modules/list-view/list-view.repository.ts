import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListView } from '../../entities/list-view.entity';
import { ViewDto } from './dto/view.dto';
import { ViewTypeDto } from './dto/view-type.dto';
import { ViewSettingDto } from './dto/view-setting.dto';
import { CacheService } from '../../common/utils/cache.util';
import { ViewType } from '../../entities/view-type.entity';
import { ViewTypeEnum } from '../../common/enums/view-type.enum';
import { ViewSetting } from '../../entities/view-setting.entity';

@Injectable()
export class ListViewRepository {
  constructor(
    @InjectRepository(ListView)
    private readonly listViewRepository: Repository<ListView>,

    @InjectRepository(ViewType)
    private readonly viewTypeRepository: Repository<ViewType>,

    @InjectRepository(ViewSetting)
    private readonly viewSettingRepository: Repository<ViewSetting>,

    private readonly cacheService: CacheService,
  ) {}

  async findAllByListId(listId: number): Promise<ViewDto[]> {
    const cacheKey = `views:${listId}`;
    const cached = this.cacheService.get<ViewDto[]>(cacheKey);

    if (cached) {
      return cached;
    }

    await this.listViewRepository.query(`PRAGMA read_uncommitted = 1`);
    const views: ViewDto[] = await this.listViewRepository.query(
      `
      SELECT
        lv.Id AS listViewId,
        lv.ViewName AS viewName
      FROM
        ListView lv
        JOIN List l ON l.Id = lv.ListId
      WHERE
        l.Id = ?
      `,
      [listId],
    );

    this.cacheService.set(cacheKey, views);

    return views;
  }

  async findAllTypes(): Promise<ViewTypeDto[]> {
    const cacheKey = `viewTypes:all`;
    const cached = this.cacheService.get<ViewTypeDto[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const types: ViewTypeDto[] = await this.viewTypeRepository.query(
      `
      SELECT 
        Id AS viewTypeId,
        TypeName AS typeName,
        Icon AS icon
      FROM
        ViewType
      `,
    );

    this.cacheService.set(cacheKey, types);

    return types;
  }

  async findAllSettingsByType(
    typeName: ViewTypeEnum,
  ): Promise<ViewSettingDto[]> {
    const cacheKey = `viewSettings:${typeName}`;
    const cached = this.cacheService.get<ViewSettingDto[]>(cacheKey);

    if (cached) {
      return cached;
    }

    await this.listViewRepository.query(`PRAGMA read_uncommitted = 1`);
    const settings: ViewSettingDto[] = await this.listViewRepository.query(`
      SELECT
        vs.Id AS viewSettingId,
        vs.DisplayName AS displayName,
        vs.ValueType AS valueType
      FROM
        ViewTypeSetting vts
        JOIN ViewType vt ON vt.Id = vts.ViewTypeId
        JOIN ViewSetting vs ON vs.Id = vts.ViewSettingId
      WHERE
        vt.TypeName = '${typeName}'
    `);

    this.cacheService.set(cacheKey, settings);

    return settings;
  }
}
