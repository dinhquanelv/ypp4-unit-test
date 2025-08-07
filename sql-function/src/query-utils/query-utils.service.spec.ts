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
      const leftTable = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
      ];
      const rightTable = [
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
      const leftTable = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ];
      const rightTable = [
        { userId: 3, city: 'Paris' },
        { userId: 4, city: 'Berlin' },
      ];
      const options = { leftKey: 'id', rightKey: 'userId' };

      const result = service.innerJoin(leftTable, rightTable, options);
      expect(result).toEqual([]);
    });
  });
});
