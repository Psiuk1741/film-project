import { Body, Controller, Delete, Get, Param, Post, Req } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('list')
  async getUserList() {
    return this.userService.getAllUsers();
  }

  @Post('account/create')
  async createUserAccount(@Req() req: any, @Body() body: UserCreateDto) {
    return this.userService.createUser(body);
  }

  @Delete(':userId')
  async deleteUserAccount(@Param('userId') id: string) {
  }
}
