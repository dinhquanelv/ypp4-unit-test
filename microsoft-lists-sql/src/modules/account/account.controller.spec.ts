import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Account } from '../../entities/account.entity';
import { AccountRepository } from './account.repository';
import { CacheService } from '../../utils/cache.service';

describe('AccountController', () => {
  let controller: AccountController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'database.sqlite',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        }),
        TypeOrmModule.forFeature([Account]),
      ],
      controllers: [AccountController],
      providers: [AccountService, AccountRepository, CacheService],
    }).compile();

    controller = module.get<AccountController>(AccountController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return account if id exists', async () => {
      const accountId = 1;
      const result = await controller.findOne(accountId);

      expect(result).toBeDefined();
    });

    it('should return null if id does not exist', async () => {
      const accountId = -1;
      const result = await controller.findOne(accountId);

      expect(result).toBeNull();
    });
  });

  describe('searchByEmailOrName', () => {
    it('should return accounts if email or name matches', async () => {
      const searchTerm = 'john.doe@example.com';
      const result = await controller.searchByEmailOrName(searchTerm);

      expect(result.length).toBeGreaterThan(0);
    });

    it('should return null if email or name does not match', async () => {
      const searchTerm = 'non.existent@example.com';
      const result = await controller.searchByEmailOrName(searchTerm);

      expect(result).toEqual([]);
    });
  });
});
