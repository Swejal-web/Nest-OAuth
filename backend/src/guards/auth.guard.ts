/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { access } from 'fs';
import { Observable } from 'rxjs';

export class AuthTokenGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { accessToken, refreshToken } = request.cookies;
    console.log(accessToken);
    return true;
  }
}
