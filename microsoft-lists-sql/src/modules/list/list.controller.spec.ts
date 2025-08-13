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

      expect(result.length).toBeGreaterThan(0);
      result.forEach((item) => {
        expect(item).toHaveProperty('listId');
        expect(item).toHaveProperty('icon');
        expect(item).toHaveProperty('color');
        expect(item).toHaveProperty('listName');
        expect(item).toHaveProperty('workspaceName');
      });
    });

    it('should return an empty array if input does not match the search term', async () => {
      const input = 'nonexistent';
      const result = await controller.searchAllListsByName(input, 1, 24);

      expect(result).toEqual([]);
    });
  });

  describe('findFavoriteListsByAccountId', () => {
    it('should return lists if accountId has favorite lists', async () => {
      const accountId = 1;
      const result = await controller.findFavoriteListsByAccountId(accountId);

      expect(result.length).toBeGreaterThan(0);
      result.forEach((item) => {
        expect(item).toHaveProperty('listId');
        expect(item).toHaveProperty('icon');
        expect(item).toHaveProperty('color');
        expect(item).toHaveProperty('listName');
        expect(item).toHaveProperty('workspaceName');
      });
    });

    it('should return an empty lists if accountId does not have favorite lists', async () => {
      const accountId = -1;
      const result = await controller.findFavoriteListsByAccountId(accountId);

      expect(result).toEqual([]);
    });
  });
});
