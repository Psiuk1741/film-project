import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import {
  UserCreateDto,
  UserLoginDto,

} from './dto/user.dto';
import { UserService } from './user.service';
import { PublicUserInfoDto } from '../common/query/user.query.dto';
import { PublicUserData } from './interface/user.interface';
import {
  ApiPaginatedResponse,
  PaginatedDto,
} from '../common/pagination/response';
import { LogoutGuard } from '../common/guards/logout.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User')
@ApiExtraModels(PublicUserData, PaginatedDto)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiPaginatedResponse('entities', PublicUserData)
  @Get('list')
  async getUserList(@Query() query: PublicUserInfoDto) {
    return this.userService.getAllUsers(query);
  }

  @Post('account/create')
  async createUserAccount(@Req() req: any, @Body() body: UserCreateDto) {
    return this.userService.createUser(body);
  }

  @Post('account/login')
  async loginUser(@Body() body: UserLoginDto) {
    return this.userService.login(body);
  }

  @UseGuards(AuthGuard(), LogoutGuard)
  @Post('logout')
  async logout(@Res() res: any) {
    return res.status(HttpStatus.OK).json('logout success');
  }

  // @Post('account/social/login')
  // async loginSocialUser(@Body() body: UserLoginSocialDto){
  //   return this.userService.login(body);
  // }

  @Delete(':userId')
  async deleteUserAccount(@Param('userId') id: string) {}
}
