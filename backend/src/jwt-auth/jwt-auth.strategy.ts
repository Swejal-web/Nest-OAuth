/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

export type JwtPayload = { name: string; email: string };

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    const extractJwtFromCookie = (req) => {
      // let token = null;
      // if (req && req.cookies) {
      //   token = req.cookies['accessToken'];
      // }
      const token = req.at;
      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };

    super({
      jwtFromRequest: extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: 'swejal',
    });
  }

  async validate(payload: JwtPayload) {
    return { username: payload.name, email: payload.email };
  }
}
