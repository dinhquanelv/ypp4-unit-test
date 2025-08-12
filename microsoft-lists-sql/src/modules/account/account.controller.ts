import { Controller } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from '../../modules/account/dto/create-account.dto';
import { UpdateAccountDto } from '../../modules/account/dto/update-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  create(createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  findOne(id: number) {
    return this.accountService.findOne(id);
  }

  findAllByEmail(email: string) {
    return this.accountService.findAllByEmail(email);
  }

  findAllByName(name: string) {
    return this.accountService.findAllByName(name);
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(id, updateAccountDto);
  }

  remove(id: number) {
    return this.accountService.remove(id);
  }
}
