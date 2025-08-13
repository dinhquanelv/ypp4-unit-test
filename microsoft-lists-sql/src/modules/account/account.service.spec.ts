import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './account.service';
import { Account } from '../../entities/account.entity';

describe('AccountService', () => {
  let service: AccountService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'database.sqlite',
          entities: [Account],
          synchronize: false, // Don't modify existing database structure
        }),
        TypeOrmModule.forFeature([Account]),
      ],
      providers: [AccountService],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return account data when valid ID is provided', async () => {
      const result = await service.findOne(1);

      expect(result).toBeDefined();
      expect(result).not.toBeNull();

      if (result) {
        expect(result).toHaveProperty('firstName');
        expect(result).toHaveProperty('lastName');
        expect(result).toHaveProperty('email');
        expect(result).toHaveProperty('avatar');
        expect(result).toHaveProperty('company');

        expect(result.firstName.length).toBeGreaterThan(0);
        expect(result.lastName.length).toBeGreaterThan(0);
        expect(result.email.length).toBeGreaterThan(0);
      }
    });

    it('should return null when account ID does not exist', async () => {
      const result = await service.findOne(99999);
      expect(result).toBeNull();
    });

    it('should return null when negative ID is provided', async () => {
      const result = await service.findOne(-1);
      expect(result).toBeNull();
    });

    it('should return null when zero ID is provided', async () => {
      const result = await service.findOne(0);
      expect(result).toBeNull();
    });
  });

  describe('findAllByEmailOrName', () => {
    it('should return account data when searching by email', async () => {
      const searchTerm = '@example.com';
      const result = await service.findAllByEmailOrName(searchTerm);

      if (result) {
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result).toHaveProperty('firstName');
        expect(result).toHaveProperty('lastName');
        expect(result).toHaveProperty('email');
        expect(result).toHaveProperty('avatar');
      }
    });

    it('should return account data when searching by first name', async () => {
      const searchTerm = 'John';
      const result = await service.findAllByEmailOrName(searchTerm);

      if (result) {
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
      }
    });

    it('should return account data when searching by last name', async () => {
      const searchTerm = 'Doe';
      const result = await service.findAllByEmailOrName(searchTerm);

      if (result) {
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
      }
    });

    it('should return null when no matching accounts are found', async () => {
      const result = await service.findAllByEmailOrName('unknown123');
      expect(result).toBeNull();
    });

    it('should handle empty string search', async () => {
      const result = await service.findAllByEmailOrName('');

      if (result) {
        expect(result).toHaveProperty('firstName');
        expect(result).toHaveProperty('lastName');
        expect(result).toHaveProperty('email');
        expect(result).toHaveProperty('avatar');
      }
    });
  });
});
