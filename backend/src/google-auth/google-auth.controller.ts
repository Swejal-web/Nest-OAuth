import { Controller, Get, UseGuards, Req, Res, Post } from '@nestjs/common';

import { JwtAuthService } from 'src/jwt-auth/jwt-auth.service';
import { GoogleOauthGuard } from 'src/guards/google-auth.guards';
import { UsersService } from 'src/users/users.service';
import { GoogleAuthService } from './google-auth.service';

import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class GoogleAuthController {
  constructor(
    private jwtAuthService: JwtAuthService,
    private usersService: UsersService,
    private googleAuthService: GoogleAuthService,
  ) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  googleAuth(@Req() req) {}

  @Get('dashboard')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dashBoard(@Req() req) {
    return req.user;
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req, @Res() res) {
    await this.usersService.getUserByEmail(req.user.email);

    const { accessToken, refreshToken } = this.jwtAuthService.login(req.user);

    await this.usersService.hashRefreshToken(refreshToken, req.user.email);

    res.cookie('accessToken', accessToken);
    res.cookie('refreshToken', refreshToken);

    res.redirect('http://localhost:3000/users/whoAmI');
    return req.user;
  }

  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  refreshTokens(@Req() req) {
    const user = req.user;
    return this.usersService.refreshTokens(user.email, user.refreshToken);
  }
}
