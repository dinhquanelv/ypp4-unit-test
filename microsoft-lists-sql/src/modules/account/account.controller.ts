import { Controller } from '@nestjs/common';

import { AccountService } from './account.service';
import { FindAccountDto } from './dto/find-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  findOne(id: number): Promise<FindAccountDto | null> {
    return this.accountService.findOne(id);
  }

  searchByEmailOrName(name: string): Promise<FindAccountDto[]> {
    return this.accountService.searchByEmailOrName(name);
  }
}
