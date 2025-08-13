import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Account } from '../../entities/account.entity';
import { FindOneAccountDto } from '../../modules/account/dto/find-one-account.dto';
import { FindAllAccountDto } from '../../modules/account/dto/find-all-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async findOne(id: number): Promise<FindOneAccountDto | null> {
    const result: FindOneAccountDto[] = await this.accountRepository.query(
      `SELECT 
          FirstName as firstName, LastName as lastName, Email as email, Avatar as avatar, Company as company
       FROM 
          account 
       WHERE 
          Id = ?`,
      [id],
    );

    return result.length > 0 ? result[0] : null;
  }

  async findAllByEmailOrName(input: string): Promise<FindAllAccountDto | null> {
    const result: FindAllAccountDto[] = await this.accountRepository.query(
      `SELECT 
          FirstName as firstName, LastName as lastName, Email as email, Avatar as avatar
       FROM 
          account 
       WHERE 
          Email LIKE ? OR FirstName LIKE ? OR LastName LIKE ?`,
      [`%${input}%`, `%${input}%`, `%${input}%`],
    );

    return result.length > 0 ? result[0] : null;
  }
}
