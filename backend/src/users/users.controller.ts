import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  Param,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthTokenGuard } from 'src/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('createUser')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.usersService.create(
      body.name,
      body.email,
      body.roles,
    );
    return user;
  }

  @Get('whoAmI')
  @UseGuards(AuthGuard('jwt'))
  getMe(@Req() req) {
    return req.user;
  }

  @Get('getUser')
  @UseGuards(AuthTokenGuard)
  get(@Req() req) {
    return 'hy';
  }

  @Get()
  findUsers(@Query('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @Patch()
  updateUser(@Query('email') email: string, @Body() body: any) {
    return this.usersService.update(email, body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
