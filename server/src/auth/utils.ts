import {
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    registerDecorator,
} from 'class-validator';
import * as jwt from 'jsonwebtoken';

require('dotenv').config();

export function generateAuthToken(userId, email): String {
    const obj = { sub: userId, email };
    const token = jwt.sign(obj, process.env.DB_SECRET, {
        expiresIn: '1h',
    });
    return token;
}

export function generateRefreshToken(userId, email): String {
    const obj = { sub: userId, email };
    const token = jwt.sign(obj, process.env.DB_SECRET_REFRESH, {
        expiresIn: '7d',
    });
    return token;
}

export function validateRefreshToken(token: string): any {
    return jwt.verify(token, process.env.DB_SECRET_REFRESH, (err, payload) => {
        if (err) {
            throw Error('Not valid refresh token');
        }

        return payload;
    });
}

@ValidatorConstraint({ name: 'HasUpperAndLowerCase', async: false })
export class HasUpperAndLowerCase implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments) {
        const pattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z]).+$');

        return pattern.test(value);
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        const field = validationArguments.property;
        return `${field} must contain at least one uppercase and one lowercase letter.`;
    }
}

// decorator function
export function ValidateHasUpperAndLowerCase(
    options?: any,
    validationOptions?: ValidationOptions,
) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isUnique',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [options],
            validator: HasUpperAndLowerCase,
        });
    };
}
