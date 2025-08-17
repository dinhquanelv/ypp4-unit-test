import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListTypeController } from './list-type.controller';
import { ListTypeService } from './list-type.service';
import { ListType } from '../../entities/list-type.entity';
import { ListTypeRepository } from './list-type.repository';
import { CacheService } from '../../utils/cache.service';

describe('ListTypeController', () => {
  let controller: ListTypeController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'database.sqlite',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        }),
        TypeOrmModule.forFeature([ListType]),
      ],
      controllers: [ListTypeController],
      providers: [ListTypeService, ListTypeRepository, CacheService],
    }).compile();

    controller = module.get<ListTypeController>(ListTypeController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all list type', async () => {
      const result = await controller.findAll();

      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('findOne', () => {
    it('should return a list type if it exists', async () => {
      const listTypeId = 1;
      const result = await controller.findOne(listTypeId);

      expect(result).toBeDefined();
    });

    it('should return null if the list type does not exist', async () => {
      const listTypeId = -1;
      const result = await controller.findOne(listTypeId);

      expect(result).toBeNull();
    });
  });
});
