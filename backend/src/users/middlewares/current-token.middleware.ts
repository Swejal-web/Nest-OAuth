/* eslint-disable prettier/prettier */
//* eslint-disable prettier/prettier */
 import { Injectable, NestMiddleware } from '@nestjs/common';
 import { Request, Response, NextFunction } from 'express';
 import { isJwtExpired } from 'jwt-check-expiration';
 import jwt_decode from 'jwt-decode';
 import { UsersService } from '../users.service';
import { User } from '../user.entity';
 import { JwtAuthService } from '../../jwt-auth/jwt-auth.service';

// // //to  add a property to  request that might have a property which is an instance of User
// // declare global {
// //   // eslint-disable-next-line @typescript-eslint/no-namespace
// //   namespace Express {
// //     interface Request {
// //       currentUser?: User;
// //     }
// //   }
// // }

 interface UserData {
   email: string;
   name: string;
   iat: number;
  exp: number;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      at?: string;
      rt?: string;
    }
  }
}

@Injectable()
export class CurrentTokenMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const accToken = req.cookies['accessToken'] 
    
    let user:UserData;
    if(accToken){
       user = jwt_decode(accToken);

    }

    if(user){
      const expireDate = user.exp - 25;

    const refToken = req.cookies['refreshToken'] || {};
    req.at = accToken;
    req.rt = refToken;
    if (Date.now() > expireDate * 1000) {
      const { accessToken, refreshToken } =
        await this.usersService.refreshTokens(user.email, refToken);

      res.cookie('accessToken', accessToken);
      res.cookie('refreshToken', refreshToken);
      req.at = accessToken;
      req.rt = refreshToken;
    }
    
    
    }

    next();
  }
}
