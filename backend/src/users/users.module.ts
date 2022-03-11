import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CurrentTokenMiddleware } from './middlewares/current-token.middleware';
import { JwtAuthModule } from 'src/jwt-auth/jwt-auth.module';
import { JwtAuthService } from 'src/jwt-auth/jwt-auth.service';

//import { JwtAuthGuard } from 'src/guards/jwt-auth.guards';

@Module({
  imports: [JwtAuthModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersModule, UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentTokenMiddleware).forRoutes('*');
  }
}
