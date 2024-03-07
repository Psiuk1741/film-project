import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ExtractJwt } from 'passport-jwt';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import { User } from '../user/user.entity';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    @InjectRedisClient() private redisClient: RedisClient,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY || 'secret',
    });
  }

  async validate(token: string): Promise<User> {
    let user = null;
    console.log(222222);
    try {
      if (!(await this.redisClient.exists(token))) {
        throw new UnauthorizedException();
      }
      await this.jwtService.verifyAsync(token);
      const decodeToken: any = this.jwtService.decode(token);
      user = await this.authService.validateUser(decodeToken);
    } catch (e) {
      console.log(
        new Date().toISOString(),
        ' [JWT USER VERIFY ERROR] ',
        JSON.stringify(e),
        ' [TOKEN] ',
        token,
      );
      throw new UnauthorizedException();
    }
    return user;
  }
}
