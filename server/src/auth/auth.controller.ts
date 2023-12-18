import {
    Controller,
    Get,
    Post,
    Body,
    Res,
    HttpCode,
    UseGuards,
    Request,
    UseFilters,
    Req,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt'; // for encrypting the password

import { CreateUserDTO } from './dto/createUser.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { User } from './model/user.model';
import { JwtAuthGuard } from './jwt-auth-guard';
import { generateAuthToken, validateRefreshToken } from './utils';
import { ResponseDTO } from 'src/dto/response.dto';
import { ApiError, handleError } from 'src/apiError/apiError';
import { InputFieldExceptionFilter } from 'src/exception-filters/inputFieldExceptionFilter';
import { RenewTokenDTO } from './dto/renewToken.dto';
import { response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseFilters(new InputFieldExceptionFilter())
    @Post('register')
    @HttpCode(201)
    async createUser(@Body() createUserDTO: CreateUserDTO, @Res() response) {
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

            if (createUserDTO.role === 1 || createUserDTO.role === 0) {
                const resultData = await this.authService.createUser(user);

                if (resultData.result === 'created') {
                    const responseDTO = new ResponseDTO();
                    responseDTO.result = true;
                    responseDTO.statusCode = 201;
                    responseDTO.payload = {};
                    response.send(responseDTO);
                } else {
                    throw new ApiError(
                        4,
                        'Unexpected error while creating user.',
                        500,
                    );
                }
            } else {
                throw new ApiError(3, 'Invalid user role.', 400);
            }
        } catch (error) {
            const apiError = handleError(error);

            response.status(apiError.statusCode).json(apiError);
        }
    }

    @Post('login')
    async login(
        @Body() loginDTO: LoginDTO,
        @Res({ passthrough: true }) response,
    ) {
        try {
            const { token, refreshToken, userName, userId } =
                await this.authService.loginUser(
                    loginDTO.email,
                    loginDTO.password,
                );

            response
                .cookie('x-access-token', token)
                //.cookie('x-refresh-token', refreshToken)
                .json(
                    new ResponseDTO(
                        true,
                        200,
                        { refreshToken, userName, userId },
                        0,
                        'Login successful',
                    ),
                );
        } catch (error) {
            //console.log(error);

            const apiError = handleError(error);

            response.status(apiError.statusCode).json(apiError);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('isauth')
    async isAuth(@Request() req) {
        return req.user;
    }

    @Post('renewtoken')
    async renewAccessToken(@Body() body: RenewTokenDTO, @Res() response) {
        try {
            const refreshToken = body.refreshToken;
            const { sub: id, email } = validateRefreshToken(refreshToken);

            const accessToken = generateAuthToken(id, email);

            //return { accessToken, refreshToken };
            response.cookie('x-access-token', accessToken).send();
        } catch (error) {
            console.log(error);

            const apiError = handleError(error);

            response
                .status(apiError.statusCode)
                .json(
                    new ResponseDTO(false, 500, {}, -1, 'Something happened'),
                );
        }
    }

    @Post('logout')
    @HttpCode(200)
    async logout(@Req() request, @Res() response) {
        try {
            response
                .clearCookie('x-access-token')
                .json(new ResponseDTO(true, 200, {}, 0, 'Logout successful'));
        } catch (error) {
            const apiError = handleError(error);

            response.status(apiError.statusCode).json(apiError);
        }
    }
}
