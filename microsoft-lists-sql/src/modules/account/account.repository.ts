import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

import { Account } from '../../entities/account.entity';
import { FindOneAccountDto } from '../../modules/account/dto/find-one-account.dto';
import { SearchAccountDto } from './dto/search-account.dto';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async findOne(id: number): Promise<FindOneAccountDto | null> {
    const query: FindOneAccountDto[] = await this.accountRepository.query(
      `SELECT 
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

  async searchByEmailOrName(input: string): Promise<SearchAccountDto | null> {
    const query: SearchAccountDto[] = await this.accountRepository.query(
      `SELECT 
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

    return query.length > 0 ? query[0] : null;
  }
}
