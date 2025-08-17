import { Injectable } from '@nestjs/common';

import { FindAccountDto } from './dto/find-account.dto';
import { AccountRepository } from './account.repository';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async findOne(id: number): Promise<FindAccountDto | null> {
    return await this.accountRepository.findOne(id);
  }

  async searchByEmailOrName(input: string): Promise<FindAccountDto[]> {
    return await this.accountRepository.searchByEmailOrName(input);
  }
}
