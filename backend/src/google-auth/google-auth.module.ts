import { Module } from '@nestjs/common';
import { JwtAuthModule } from 'src/jwt-auth/jwt-auth.module';
import { UsersModule } from 'src/users/users.module';

import { GoogleAuthController } from './google-auth.controller';
import { GoogleAuthService } from './google-auth.service';
import { GoogleOauthStrategy } from './google-auth.strategy';

@Module({
  imports: [UsersModule, JwtAuthModule],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService, GoogleOauthStrategy],
})
export class GoogleAuthModule {}
