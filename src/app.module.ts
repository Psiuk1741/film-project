import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { TypeOrmConfiguration } from './config/database/type-orm-configuration';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRootAsync(TypeOrmConfiguration.config),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
