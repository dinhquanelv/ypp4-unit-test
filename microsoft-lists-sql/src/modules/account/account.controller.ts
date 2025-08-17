import { Controller } from '@nestjs/common';

import { AccountService } from './account.service';
import { AccountDto } from './dto/account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  findOne(id: number): Promise<AccountDto | null> {
    return this.accountService.findOne(id);
  }

  searchByEmailOrName(name: string): Promise<AccountDto[]> {
    return this.accountService.searchByEmailOrName(name);
  }
}
