import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { TaskModule } from './task/task.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, TaskModule, StatusModule],
})
export class AppModule {}
