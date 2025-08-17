import { Injectable } from '@nestjs/common';

import { AccountDto } from './dto/account.dto';
import { AccountRepository } from './account.repository';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async findOne(id: number): Promise<AccountDto | null> {
    return await this.accountRepository.findOne(id);
  }

  async searchByEmailOrName(input: string): Promise<AccountDto[]> {
    return await this.accountRepository.searchByEmailOrName(input);
  }
}
