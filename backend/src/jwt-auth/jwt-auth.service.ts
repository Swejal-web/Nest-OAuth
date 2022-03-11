import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-auth.strategy';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  login(user) {
    const payload: JwtPayload = {
      email: user.email,
      name: user.name,
    };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: 'swejal',
        expiresIn: 60 * 1,
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: 'shrestha',
        expiresIn: 60 * 60 * 24 * 7,
      }),
    };
  }
}
