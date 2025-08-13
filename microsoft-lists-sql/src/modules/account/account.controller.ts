import { Controller } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  findOne(id: number) {
    return this.accountService.findOne(id);
  }

  searchByEmailOrName(name: string) {
    return this.accountService.searchByEmailOrName(name);
  }
}
