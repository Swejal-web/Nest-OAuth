import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

import { JwtAuthService } from './jwt-auth.service';
import { JwtAuthStrategy } from './jwt-auth.strategy';
import { RefreshTokenStrategy } from './refresh-auth.strategy';

@Module({
  imports: [JwtModule.register({})],
  providers: [JwtAuthStrategy, JwtAuthService, RefreshTokenStrategy],
  exports: [JwtModule, JwtAuthService],
})
export class JwtAuthModule {}
