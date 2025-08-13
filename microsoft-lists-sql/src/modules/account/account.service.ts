import { Injectable } from '@nestjs/common';

import { FindOneAccountDto } from '../../modules/account/dto/find-one-account.dto';
import { SearchAccountDto } from './dto/search-account.dto';
import { AccountRepository } from '../../modules/account/account.repository';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async findOneAccountById(id: number): Promise<FindOneAccountDto | null> {
    return await this.accountRepository.findOneAccountById(id);
  }

  async searchAccountByEmailOrName(
    input: string,
  ): Promise<SearchAccountDto | null> {
    return await this.accountRepository.searchAccountByEmailOrName(input);
  }
}
