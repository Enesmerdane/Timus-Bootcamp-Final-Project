import {
    Controller,
    Get,
    Post,
    Body,
    Res,
    HttpCode,
    UseGuards,
    Request,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt'; // for encrypting the password

import { CreateUserDTO } from './dto/createUser.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { User } from './model/user.model';
import { JwtAuthGuard } from './jwt-auth-guard';
import { generateAuthToken, validateRefreshToken } from './utils';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @HttpCode(201)
    async createUser(@Body() createUserDTO: CreateUserDTO) {
        try {
            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(createUserDTO.password, salt);

            const user = new User(
                createUserDTO.username,
                createUserDTO.email,
                hash,
                createUserDTO.role,
                new Date(),
            );

            if (createUserDTO.role === 0) {
                // TODO: call create admin service
            } else if (createUserDTO.role === 1) {
                // Call create normal user service
                return await this.authService.createUser(user);
            } else {
                throw new Error();
            }
        } catch (err) {
            // TODO: Error handling
        }
    }

    @Post('login')
    async login(
        @Body() loginDTO: LoginDTO,
        @Res({ passthrough: true }) response,
    ) {
        try {
            const { token, refreshToken } = await this.authService.loginUser(
                loginDTO.email,
                loginDTO.password,
            );

            response
                .cookie('x-access-token', token)
                .cookie('x-refresh-token', refreshToken)
                .json({ message: 'Login successful', token, refreshToken });
        } catch (err) {
            // TODO: Error handling
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('isauth')
    async isAuth(@Request() req) {
        return req.user;
    }

    @Post('renewtoken')
    async renewAccessToken(@Body() body: any) {
        try {
            const refreshToken = body.refreshToken;
            const { sub: id, email } = validateRefreshToken(refreshToken);

            const accessToken = generateAuthToken(id, email);

            return { accessToken, refreshToken };
        } catch (err) {
            return err;
            // TODO: handle error
        }
    }
}
