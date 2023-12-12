import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

require('dotenv').config();

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            //ignoreExpiration: false,
            secretOrKey: process.env.DB_SECRET,
        });
    }

    async validate(payload: any): Promise<any> {
        return { userId: payload.sub, username: payload.username };
    }
}
