import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TrashItemController } from './trash-item.controller';
import { TrashItemService } from './trash-item.service';
import { TrashItem } from '../../entities/trash-item.entity';
import { TrashItemRepository } from './trash-item.repository';
import { CacheService } from '../../utils/cache.service';
import { SortOrder } from '../../common/enums/sort-order.enum';

describe('TrashItemController', () => {
  let controller: TrashItemController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'database.sqlite',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        }),
        TypeOrmModule.forFeature([TrashItem]),
      ],
      controllers: [TrashItemController],
      providers: [TrashItemService, TrashItemRepository, CacheService],
    }).compile();

    controller = module.get<TrashItemController>(TrashItemController);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return trash items if they exist', async () => {
      const result = await controller.findAll();

      expect(result.length).toBeGreaterThan(0);
    });

    it('should return trash items ordered by objectName ascending', async () => {
      const result = await controller.findAll('objectName', SortOrder.ASC);

      expect(result.length).toBeGreaterThan(0);
    });

    it('should return trash items ordered by objectName descending', async () => {
      const result = await controller.findAll('objectName', SortOrder.DESC);

      expect(result.length).toBeGreaterThan(0);
    });

    it('should return trash items ordered by deletedBy ascending', async () => {
      const result = await controller.findAll('deletedBy', SortOrder.ASC);

      expect(result.length).toBeGreaterThan(0);
    });

    it('should return trash items ordered by deletedBy descending', async () => {
      const result = await controller.findAll('deletedBy', SortOrder.DESC);

      expect(result.length).toBeGreaterThan(0);
    });

    it('should return trash items ordered by createdBy ascending', async () => {
      const result = await controller.findAll('createdBy', SortOrder.ASC);

      expect(result.length).toBeGreaterThan(0);
    });

    it('should return trash items ordered by createdBy descending', async () => {
      const result = await controller.findAll('createdBy', SortOrder.DESC);

      expect(result.length).toBeGreaterThan(0);
    });

    it('should return trash items ordered by deletedAt ascending', async () => {
      const result = await controller.findAll('deletedAt', SortOrder.ASC);

      expect(result.length).toBeGreaterThan(0);
    });

    it('should return trash items ordered by deletedAt descending', async () => {
      const result = await controller.findAll('deletedAt', SortOrder.DESC);

      expect(result.length).toBeGreaterThan(0);
    });
  });
});
