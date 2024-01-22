import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { User } from '../user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { BearerStrategy } from './bearer.strategy';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'bearer',
      property: 'user',
      session: false,
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET_KEY || 'secret',
        signOptions: {
          expiresIn: process.env.JWT_TTL || '24h',
        },
        verifyOptions: {
          clockTolerance: 60,
          maxAge: process.env.JWT_TTL || '24h',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, BearerStrategy],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
