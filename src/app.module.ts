import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './core/auth/auth.module';
import { PrismaModule } from './core/prisma/prisma.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [UsersModule, AuthModule, PrismaModule, CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
