import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Account } from '../../entities/account.entity';
import { AccountRepository } from '../../modules/account/account.repository';

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
          synchronize: false,
        }),
        TypeOrmModule.forFeature([Account]),
      ],
      controllers: [AccountController],
      providers: [AccountService, AccountRepository],
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
    it('should return account data when valid ID is provided', async () => {
      const accountId = 1;
      const result = await controller.findOne(accountId);

      expect(result).toBeDefined();
      expect(result).not.toBeNull();
      expect(result).toHaveProperty('firstName');
      expect(result).toHaveProperty('lastName');
      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('avatar');
      expect(result).toHaveProperty('company');
    });

    it('should return null when account does not exist', async () => {
      const accountId = -1;
      const result = await controller.findOne(accountId);

      expect(result).toBeNull();
    });
  });
});
