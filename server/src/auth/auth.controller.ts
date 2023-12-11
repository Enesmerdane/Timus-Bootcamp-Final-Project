import { Controller, Inject, Post, Body } from '@nestjs/common';
import * as bcrypt from 'bcrypt'; // for encrypting the password

import { CreateUserDTO } from './dto/createUser.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { User } from './model/user.model';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
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
                return this.authService.createUser(user);
            } else {
                throw new Error();
            }
        } catch (err) {
            // TODO: Error handling
        }
    }

    @Post('login')
    async login(@Body() loginDTO: LoginDTO) {
        try {
            const result = await this.authService.loginUser(
                loginDTO.email,
                loginDTO.password,
            );

            return result;
        } catch (err) {
            // TODO: Error handling
        }
    }
}
