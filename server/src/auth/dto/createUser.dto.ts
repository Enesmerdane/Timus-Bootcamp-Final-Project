import {
    IsAlpha,
    IsAlphanumeric,
    IsEmail,
    IsIn,
    IsNotEmpty,
    Min,
    Validate,
} from 'class-validator';
import { ValidateHasUpperAndLowerCase } from '../utils';

export class CreateUserDTO {
    @IsNotEmpty()
    @IsAlpha()
    @Min(8)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Min(8)
    @IsAlphanumeric()
    @ValidateHasUpperAndLowerCase()
    password: string;

    @IsNotEmpty()
    @IsIn([0, 1])
    role: number;
}
