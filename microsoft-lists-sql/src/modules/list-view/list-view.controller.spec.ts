import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListViewController } from './list-view.controller';
import { ListViewService } from './list-view.service';
import { ListView } from '../../entities/list-view.entity';
import { ListViewRepository } from './list-view.repository';
import { CacheService } from '../../common/utils/cache.util';
import { ViewType } from '../../entities/view-type.entity';
import { ViewTypeEnum } from '../../common/enums/view-type.enum';
import { ViewSetting } from '../../entities/view-setting.entity';

describe('ListViewController', () => {
  let controller: ListViewController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'database.sqlite',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        }),
        TypeOrmModule.forFeature([ListView, ViewType, ViewSetting]),
      ],
      controllers: [ListViewController],
      providers: [ListViewService, ListViewRepository, CacheService],
    }).compile();

    controller = module.get<ListViewController>(ListViewController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllByListId', () => {
    it('should return views', async () => {
      const listId = 1;
      const result = await controller.findAllByListId(listId);

      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('findAllTypes', () => {
    it('should return view types', async () => {
      const result = await controller.findAllTypes();

      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('findAllSettingsByType', () => {
    it('should return view settings of Calendar', async () => {
      const typeName = ViewTypeEnum.CALENDAR;
      const result = await controller.findAllSettingsByType(typeName);

      expect(result.length).toBeGreaterThan(0);
    });
  });
});
