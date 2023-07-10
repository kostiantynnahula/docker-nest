import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HashService } from 'src/users/hash.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, HashService],
  imports: [PrismaModule],
  exports: [UsersService, HashService],
})
export class UsersModule {}
