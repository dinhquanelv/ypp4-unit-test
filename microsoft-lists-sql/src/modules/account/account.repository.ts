import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

import { Account } from '../../entities/account.entity';
import { AccountDto } from './dto/account.dto';
import { CacheService } from '../../utils/cache.service';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly cacheService: CacheService,
  ) {}

  async findOne(id: number): Promise<AccountDto | null> {
    const cacheKey = `account:${id}`;
    const cachedAccount = this.cacheService.get<AccountDto>(cacheKey);

    if (cachedAccount) {
      return cachedAccount;
    }

    await this.accountRepository.query(`PRAGMA read_uncommitted = 1`);
    const query: AccountDto[] = await this.accountRepository.query(
      `
        SELECT 
          FirstName as firstName, 
          LastName as lastName, 
          Email as email, 
          Avatar as avatar, 
          Company as company
        FROM 
          Account 
        WHERE 
          Id = ?`,
      [id],
    );

    return query.length > 0 ? query[0] : null;
  }

  async searchByEmailOrName(input: string): Promise<AccountDto[]> {
    await this.accountRepository.query(`PRAGMA read_uncommitted = 1`);
    const accounts: AccountDto[] = await this.accountRepository.query(
      `
        SELECT 
          FirstName as firstName, 
          LastName as lastName, 
          Email as email, 
          Avatar as avatar
        FROM 
          Account
        WHERE 
          Email LIKE ? 
          OR FirstName LIKE ? 
          OR LastName LIKE ?`,
      [`%${input}%`, `%${input}%`, `%${input}%`],
    );

    return accounts;
  }
}
