import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

require('dotenv').config();

const cookieExtractor = (req) => {
    let token = null;
    if(req && req.cookies){
        token = req.cookies['x-access-token'];
        return token
    }
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            jwtFromRequest: cookieExtractor,
            //ignoreExpiration: false,
            secretOrKey: process.env.DB_SECRET,
        });
    }

    async validate(payload: any): Promise<any> {
        return { userId: payload.sub, email: payload.email };
    }
}
