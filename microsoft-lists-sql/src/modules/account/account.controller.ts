import { Controller } from '@nestjs/common';

import { AccountService } from './account.service';
import { FindOneAccountDto } from '../../modules/account/dto/find-one-account.dto';
import { SearchAccountDto } from '../../modules/account/dto/search-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  findOne(id: number): Promise<FindOneAccountDto | null> {
    return this.accountService.findOne(id);
  }

  searchByEmailOrName(name: string): Promise<SearchAccountDto | null> {
    return this.accountService.searchByEmailOrName(name);
  }
}
