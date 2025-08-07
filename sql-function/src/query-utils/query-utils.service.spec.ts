import { Test, TestingModule } from '@nestjs/testing';
import { QueryUtilsService } from './query-utils.service';

describe('QueryUtilsService', () => {
  let service: QueryUtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryUtilsService],
    }).compile();

    service = module.get<QueryUtilsService>(QueryUtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('innerJoin', () => {
    it('should return joined records based on matching keys', () => {
      const leftTable: Record<string, unknown>[] = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
      ];
      const rightTable: Record<string, unknown>[] = [
        { userId: 1, city: 'New York' },
        { userId: 2, city: 'London' },
        { userId: 4, city: 'Paris' },
      ];
      const options = { leftKey: 'id', rightKey: 'userId' };

      const result = service.innerJoin(leftTable, rightTable, options);
      expect(result).toEqual([
        { id: 1, name: 'Alice', userId: 1, city: 'New York' },
        { id: 2, name: 'Bob', userId: 2, city: 'London' },
      ]);
    });

    it('should return an empty array if no matches are found', () => {
      const leftTable: Record<string, unknown>[] = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ];
      const rightTable: Record<string, unknown>[] = [
        { userId: 3, city: 'Paris' },
        { userId: 4, city: 'Berlin' },
      ];
      const options = { leftKey: 'id', rightKey: 'userId' };

      const result = service.innerJoin(leftTable, rightTable, options);
      expect(result).toEqual([]);
    });
  });

  describe('leftJoin', () => {
    it('should return all records from left table and matched records from right table', () => {
      const leftTable: Record<string, unknown>[] = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
      ];
      const rightTable: Record<string, unknown>[] = [
        { userId: 1, city: 'New York' },
        { userId: 2, city: 'London' },
        { userId: 4, city: 'Paris' },
      ];
      const options = { leftKey: 'id', rightKey: 'userId' };

      const result = service.leftJoin(leftTable, rightTable, options);
      expect(result).toEqual([
        { id: 1, name: 'Alice', userId: 1, city: 'New York' },
        { id: 2, name: 'Bob', userId: 2, city: 'London' },
        { id: 3, name: 'Charlie', userId: null },
      ]);
    });

    it('should return all left table records if right table is empty', () => {
      const leftTable: Record<string, unknown>[] = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ];
      const rightTable: Record<string, unknown>[] = [];

      const options = { leftKey: 'id', rightKey: 'userId' };

      const result = service.leftJoin(leftTable, rightTable, options);
      expect(result).toEqual([
        { id: 1, name: 'Alice', userId: null },
        { id: 2, name: 'Bob', userId: null },
      ]);
    });

    it('should return empty array if left table is empty', () => {
      const leftTable: Record<string, unknown>[] = [];
      const rightTable: Record<string, unknown>[] = [
        { userId: 1, city: 'New York' },
      ];
      const options = { leftKey: 'id', rightKey: 'userId' };

      const result = service.leftJoin(leftTable, rightTable, options);
      expect(result).toEqual([]);
    });
  });
});
