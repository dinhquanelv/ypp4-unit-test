import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListController } from './list.controller';
import { ListService } from './list.service';
import { List } from '../../entities/list.entity';
import { ListRepository } from './list.repository';
import { CacheService } from '../../common/utils/cache.util';

describe('ListController', () => {
  let controller: ListController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'database.sqlite',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        }),
        TypeOrmModule.forFeature([List]),
      ],
      controllers: [ListController],
      providers: [ListService, ListRepository, CacheService],
    }).compile();

    controller = module.get<ListController>(ListController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('searchByName', () => {
    it('should return lists if input matches the search term', async () => {
      const input = 'project';
      const result = await controller.searchByName(input, 1, 24);

      expect(result.length).toBeGreaterThan(0);
    });

    it('should return an empty array if input does not match the search term', async () => {
      const input = 'nonexistent';
      const result = await controller.searchByName(input, 1, 24);

      expect(result).toEqual([]);
    });
  });

  describe('findFavoritesByAccountId', () => {
    it('should return lists if accountId has favorite lists', async () => {
      const accountId = 1;
      const result = await controller.findFavoritesByAccountId(accountId);

      expect(result.length).toBeGreaterThan(0);
    });

    it('should return an empty lists if accountId does not have favorite lists', async () => {
      const accountId = -1;
      const result = await controller.findFavoritesByAccountId(accountId);

      expect(result).toEqual([]);
    });
  });

  describe('findRecentByAccountId', () => {
    it('should return recent lists if accountId has recent lists', async () => {
      const accountId = 1;
      const result = await controller.findRecentByAccountId(accountId);

      expect(result.length).toBeGreaterThan(0);
    });

    it('should return an empty array if accountId does not have recent lists', async () => {
      const accountId = -1;
      const result = await controller.findRecentByAccountId(accountId);

      expect(result).toEqual([]);
    });
  });

  describe('findAllByAccountId', () => {
    it('should return lists if accountId have access to', async () => {
      const accountId = 1;
      const result = await controller.findAllByAccountId(accountId);

      expect(result.length).toBeGreaterThan(0);
    });

    it('should return an empty array if accountId has no access to lists', async () => {
      const accountId = -1;
      const result = await controller.findAllByAccountId(accountId);

      expect(result).toEqual([]);
    });
  });

  describe('findOneById', () => {
    it('should return a list if it exists', async () => {
      const accountId = 1;
      const listId = 1;
      const result = await controller.findOneById(accountId, listId);

      expect(result).toBeDefined();
    });

    it('should return null if the list does not exist', async () => {
      const accountId = 1;
      const listId = -1;
      const result = await controller.findOneById(accountId, listId);

      expect(result).toBeNull();
    });

    it('should return null if account does not exist', async () => {
      const accountId = -1;
      const listId = 1;
      const result = await controller.findOneById(accountId, listId);

      expect(result).toBeNull();
    });

    it('should return null if account and list does not exist', async () => {
      const accountId = -1;
      const listId = -1;
      const result = await controller.findOneById(accountId, listId);

      expect(result).toBeNull();
    });
  });
});
