import { Module } from '@nestjs/common';

import configuration from './configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresqlConfigService } from './configuration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],

  providers: [ConfigService, PostgresqlConfigService],
  exports: [ConfigService, PostgresqlConfigService],
})
export class PostgresqlConfigModule {}
