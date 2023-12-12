import {
    IsAlpha,
    IsAlphanumeric,
    IsEmail,
    IsIn,
    IsNotEmpty,
    MinLength,
} from 'class-validator';
import { ValidateHasUpperAndLowerCase } from '../utils';

export class CreateUserDTO {
    @IsNotEmpty()
    @IsAlpha()
    @MinLength(8)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @IsAlphanumeric()
    @ValidateHasUpperAndLowerCase()
    password: string;

    @IsNotEmpty()
    @IsIn([0, 1])
    role: number;
}
