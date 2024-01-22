import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  private salt = 5;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(data: UserCreateDto) {
    const findUser = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (findUser) {
      throw new HttpException(
        'User with this email is already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    data.password = await this.getHash(data.password);
    const newUser: User = this.userRepository.create(data);
    // await newUser.save();
    await this.userRepository.save(newUser);

    const token = await this.signIn(newUser);
    return token;
  }

  async getHash(password: string) {
    return await bcrypt.hash(password, this.salt);
  }

  async signIn(user) {
    return await this.authService.signIn({
      id: user.id.toString(),
    });
  }
}
