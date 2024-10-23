import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [AccountModule, HttpModule, PrismaModule, UserModule, TokenModule],
  exports: [AccountModule, HttpModule, PrismaModule, UserModule],
})
export class AppModule {}
