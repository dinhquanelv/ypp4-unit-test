import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccountService } from './account.service';
import { Account } from '../../entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';

describe('AccountService', () => {
  let service: AccountService;
  let accountRepository: Repository<Account>;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST || 'localhost',
          port: parseInt(process.env.DB_PORT || '5432'),
          username: process.env.DB_USERNAME || 'postgres',
          password: process.env.DB_PASSWORD || 'dinhquan11',
          database: process.env.DB_NAME || 'MicrosoftLists',
          entities: [Account],
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([Account]),
      ],
      providers: [AccountService],
    }).compile();

    service = module.get<AccountService>(AccountService);
    accountRepository = module.get<Repository<Account>>(
      getRepositoryToken(Account),
    );
  });

  afterAll(async () => {
    await module.close();
  });

  beforeEach(async () => {
    // Clean up database before each test
    await accountRepository.clear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new account', async () => {
      const createAccountDto: CreateAccountDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        accountPassword: 'securePassword123',
        avatar: 'https://example.com/avatar.jpg',
        company: 'Test Company',
        accountStatus: 'active',
      };

      const result = await service.create(createAccountDto);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.firstName).toBe(createAccountDto.firstName);
      expect(result.lastName).toBe(createAccountDto.lastName);
      expect(result.email).toBe(createAccountDto.email);
      expect(result.accountPassword).toBe(createAccountDto.accountPassword);
      expect(result.avatar).toBe(createAccountDto.avatar);
      expect(result.company).toBe(createAccountDto.company);
      expect(result.accountStatus).toBe(createAccountDto.accountStatus);
      expect(result.createdAt).toBeDefined();
      expect(result.updatedAt).toBeDefined();

      const insertedAccount = await accountRepository.findOne({
        where: { id: result.id },
      });

      expect(insertedAccount).toBeDefined();
      expect(insertedAccount).not.toBeNull();
      if (insertedAccount) {
        expect(insertedAccount.firstName).toBe(createAccountDto.firstName);
        expect(insertedAccount.lastName).toBe(createAccountDto.lastName);
        expect(insertedAccount.email).toBe(createAccountDto.email);
      }
    });
  });
});
