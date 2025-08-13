import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListController } from './list.controller';
import { ListService } from './list.service';
import { List } from '../../entities/list.entity';
import { ListRepository } from '../../modules/list/list.repository';

describe('ListController', () => {
  let controller: ListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'database.sqlite',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        }),
        TypeOrmModule.forFeature([List]),
      ],
      controllers: [ListController],
      providers: [ListService, ListRepository],
    }).compile();

    controller = module.get<ListController>(ListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('searchAllListsByName', () => {
    it('should return lists if input matches the search term', async () => {
      const input = 'project';
      const result = await controller.searchAllListsByName(input, 1, 24);

      expect(result).toBeDefined();
      expect(result).not.toBeNull();
      expect(Array.isArray(result)).toBe(true);
      if (result) {
        expect(result[0]).toHaveProperty('listId');
        expect(result[0]).toHaveProperty('icon');
        expect(result[0]).toHaveProperty('color');
        expect(result[0]).toHaveProperty('listName');
        expect(result[0]).toHaveProperty('workspaceName');
      }
    });

    it('should return an empty array if input does not match the search term', async () => {
      const input = 'nonexistent';
      const result = await controller.searchAllListsByName(input, 1, 24);

      expect(result).toBeDefined();
      expect(result).not.toBeNull();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toEqual([]);
    });
  });
});
