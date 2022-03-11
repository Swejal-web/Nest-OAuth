import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import * as bcyrpt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

import { JwtAuthService } from 'src/jwt-auth/jwt-auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwtAuthService: JwtAuthService,
  ) {}
  create(name: string, email: string, roles: string) {
    const user = this.repo.create({ name, email, roles });
    console.log(user);
    return this.repo.save(user);
  }

  async getUserByEmail(email: string) {
    const user = await this.repo.find({ email });

    if (!user.length) {
      throw new ForbiddenException('You cannot login with this account');
    }
    return user;
  }

  async update(email: string, attrs: string) {
    //if you directly use update then it will not call the hooks in the entity class
    const user = await this.repo.find({ email });
    if (!user) {
      throw new NotFoundException('user not found'); //NotFoundException will only work for http and not for websockets or grpc
    }

    user[0].refreshToken = attrs;
    return this.repo.save(user);
  } //Partial takes either none, one or all properties in User entity

  async remove(id: number) {
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
    // if we use delete(id) it will not call the hooks
  }

  hashData(data: string) {
    return bcyrpt.hash(data, 10);
  }

  async hashRefreshToken(refreshToken: string, email: string) {
    const hash = await this.hashData(refreshToken);

    await this.update(email, hash);
  }

  async refreshTokens(email: string, refreshTok: string) {
    const user = await this.getUserByEmail(email);

    if (!user.length) {
      throw new ForbiddenException('Access Denied');
    }
    const refreshMatches = await bcyrpt.compare(
      refreshTok,
      user[0].refreshToken,
    );
    if (!refreshMatches) throw new ForbiddenException('Access Denied');

    const { accessToken, refreshToken } = await this.jwtAuthService.login(
      user[0],
    );
    await this.hashRefreshToken(refreshToken, user[0].email);

    return { accessToken, refreshToken };
  }
}
