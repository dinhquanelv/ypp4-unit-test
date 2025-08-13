import { Controller } from '@nestjs/common';

import { AccountService } from './account.service';
import { FindOneAccountDto } from '../../modules/account/dto/find-one-account.dto';
import { SearchAccountDto } from '../../modules/account/dto/search-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  findOneAccountById(id: number): Promise<FindOneAccountDto | null> {
    return this.accountService.findOneAccountById(id);
  }

  searchAccountByEmailOrName(name: string): Promise<SearchAccountDto | null> {
    return this.accountService.searchAccountByEmailOrName(name);
  }
}
