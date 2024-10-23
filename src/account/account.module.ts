import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { HttpModule } from '@nestjs/axios';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenService } from 'src/token/token.service';

@Module({
  imports:[HttpModule],
  controllers: [AccountController],
  providers: [AccountService, UserService, PrismaService, TokenService],
  exports: [AccountService]
})
export class AccountModule {}
