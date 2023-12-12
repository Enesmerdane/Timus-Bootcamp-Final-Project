import { Module } from '@nestjs/common';
import { ElasticDbModule } from 'src/elastic-db/elastic-db.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

require('dotenv').config();

@Module({
    imports: [
        ElasticDbModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.DB_SECRET,
            //signOptions: { expiresIn: '60s' }
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
