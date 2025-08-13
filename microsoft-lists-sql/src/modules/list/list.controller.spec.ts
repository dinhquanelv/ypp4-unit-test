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

  describe('findRecentListsByAccountId', () => {
    it('should return recent lists if accountId has recent lists', async () => {
      const accountId = 1;
      const result = await controller.findRecentListsByAccountId(accountId);

      expect(result.length).toBeGreaterThan(0);
      result.forEach((item) => {
        expect(item).toHaveProperty('listId');
        expect(item).toHaveProperty('icon');
        expect(item).toHaveProperty('color');
        expect(item).toHaveProperty('listName');
        expect(item).toHaveProperty('workspaceName');
        expect(item).toHaveProperty('accessedAt');
      });
    });

    it('should return an empty array if accountId does not have recent lists', async () => {
      const accountId = -1;
      const result = await controller.findRecentListsByAccountId(accountId);

      expect(result).toEqual([]);
    });
  });

  describe('findAllListsByAccountId', () => {
    it('should return lists if accountId have access to', async () => {
      const accountId = 1;
      const result = await controller.findAllListsByAccountId(accountId);

      expect(result.length).toBeGreaterThan(0);
      result.forEach((item) => {
        expect(item).toHaveProperty('listId');
        expect(item).toHaveProperty('icon');
        expect(item).toHaveProperty('color');
        expect(item).toHaveProperty('listName');
        expect(item).toHaveProperty('workspaceName');
      });
    });

    it('should return an empty array if accountId has no access to lists', async () => {
      const accountId = -1;
      const result = await controller.findAllListsByAccountId(accountId);

      expect(result).toEqual([]);
    });
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

  describe('findOneListById', () => {
    it('should return a list if it exists', async () => {
      const accountId = 1;
      const listId = 1;
      const result = await controller.findOneListById(accountId, listId);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('listId');
      expect(result).toHaveProperty('icon');
      expect(result).toHaveProperty('color');
      expect(result).toHaveProperty('listName');
      expect(result).toHaveProperty('workspaceName');
      expect(result).toHaveProperty('isFavoriteList');
    });

    it('should return null if the list does not exist', async () => {
      const accountId = 1;
      const listId = -1;
      const result = await controller.findOneListById(accountId, listId);

      expect(result).toBeNull();
    });

    it('should return null if account does not exist', async () => {
      const accountId = -1;
      const listId = 1;
      const result = await controller.findOneListById(accountId, listId);

      expect(result).toBeNull();
    });

    it('should return null if account and list does not exist', async () => {
      const accountId = -1;
      const listId = -1;
      const result = await controller.findOneListById(accountId, listId);

      expect(result).toBeNull();
    });
  });
});
