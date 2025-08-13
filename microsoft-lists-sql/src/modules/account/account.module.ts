import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { Account } from '../../entities/account.entity';
import { AccountRepository } from '../../modules/account/account.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
})
export class AccountModule {}
