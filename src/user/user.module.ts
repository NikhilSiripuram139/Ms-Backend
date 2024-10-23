import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';

@Module({
  imports : [PrismaModule],
  providers: [UserService, PrismaService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
