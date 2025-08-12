import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Account } from '../../entities/account.entity';
import { CreateAccountDto } from '../../modules/account/dto/create-account.dto';
import { FindOneAccountDto } from '../../modules/account/dto/find-one-account.dto';
import { UpdateAccountDto } from '../../modules/account/dto/update-account.dto';
import { FindAllAccountDto } from '../../modules/account/dto/find-all-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const params = Object.values(createAccountDto);

    const result: Account[] = await this.accountRepository.query(
      `INSERT INTO 
          account ("firstName", "lastName", email, "accountPassword", avatar, company, "accountStatus", "createdAt", "updatedAt")
       VALUES 
          ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
       RETURNING *`,
      params,
    );

    return result[0];
  }

  async findOne(id: number): Promise<FindOneAccountDto | null> {
    const result: FindOneAccountDto[] = await this.accountRepository.query(
      `SELECT 
          "firstName", "lastName", email, avatar, company
       FROM 
          account 
       WHERE 
          id = $1`,
      [id],
    );

    return result.length > 0 ? result[0] : null;
  }

  async findAllByEmail(email: string): Promise<FindAllAccountDto | null> {
    const result: FindAllAccountDto[] = await this.accountRepository.query(
      `SELECT 
          "firstName", "lastName", email, avatar
       FROM 
          account 
       WHERE 
          email = $1`,
      [email],
    );

    return result.length > 0 ? result[0] : null;
  }

  async findAllByName(name: string): Promise<FindAllAccountDto | null> {
    const result: FindAllAccountDto[] = await this.accountRepository.query(
      `SELECT 
          "firstName", "lastName", email, avatar
       FROM 
          account 
       WHERE 
          "firstName" ILIKE $1 OR "lastName" ILIKE $1`,
      [`%${name}%`],
    );

    return result.length > 0 ? result[0] : null;
  }

  async update(
    id: number,
    updateAccountDto: UpdateAccountDto,
  ): Promise<boolean> {
    const fields = Object.keys(updateAccountDto);
    const values = Object.values(updateAccountDto) as (string | undefined)[];

    if (fields.length === 0) {
      return false;
    }

    // Map camelCase field names to database column names
    const fieldMappings: { [key: string]: string } = {
      firstName: '"firstName"',
      lastName: '"lastName"',
      accountPassword: '"accountPassword"',
      accountStatus: '"accountStatus"',
      email: 'email',
      avatar: 'avatar',
      company: 'company',
    };

    const setClause = fields
      .map((field, index) => `${fieldMappings[field] || field} = $${index + 2}`)
      .join(', ');

    const result: [any, number] = await this.accountRepository.query(
      `UPDATE 
          account 
       SET 
          ${setClause}, "updatedAt" = NOW()
       WHERE 
          id = $1`,
      [id, ...values],
    );

    return result[1] > 0;
  }

  async remove(id: number): Promise<boolean> {
    const result: [any, number] = await this.accountRepository.query(
      `DELETE 
       FROM
          account 
       WHERE 
          id = $1`,
      [id],
    );

    return result[1] > 0;
  }
}
