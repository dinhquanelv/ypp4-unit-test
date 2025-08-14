import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListTypeController } from './list-type.controller';
import { ListTypeService } from './list-type.service';
import { ListType } from '../../entities/list-type.entity';
import { ListTypeRepository } from './list-type.repository';

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
      providers: [ListTypeService, ListTypeRepository],
    }).compile();

    controller = module.get<ListTypeController>(ListTypeController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllListType', () => {
    it('should return all list type', async () => {
      const result = await controller.findAllListType();

      expect(result.length).toBeGreaterThan(0);
      result.forEach((item) => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('icon');
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('listTypeDescription');
      });
    });
  });

  describe('findOneListType', () => {
    it('should return a list type if it exists', async () => {
      const listTypeId = 1;
      const result = await controller.findOneListType(listTypeId);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('listTypeId');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('listTypeDescription');
      expect(result).toHaveProperty('headerImage');
    });

    it('should return null if the list type does not exist', async () => {
      const listTypeId = -1;
      const result = await controller.findOneListType(listTypeId);

      expect(result).toBeNull();
    });
  });
});
