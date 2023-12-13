import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt'; // for encrypting the password

import { User } from './model/user.model';
import { generateAuthToken, generateRefreshToken } from './utils';
import { ApiError } from 'src/apiError/apiError';
@Injectable()
export class AuthService {
    constructor(@Inject('ELASTICSEARCH_CONNECTION') private elasticConn: any) {}

    async createUser(payload: User) {
        // Check whether a user with given username exists
        const usernameExistsResult = await this.elasticConn.search({
            index: 'users_auth',
            query: {
                match_phrase: {
                    username: payload.getUserName(),
                },
            },
        });

        if (usernameExistsResult.hits.total.value > 0) {
            throw new ApiError(1, 'Username already exists.', 400);
        }

        // Check whether a user with given email exists
        const emailExistsResult = await this.elasticConn.search({
            index: 'users_auth',
            query: {
                match_phrase: {
                    email: payload.getEmail(),
                },
            },
        });

        if (emailExistsResult.hits.total.value > 0) {
            throw new ApiError(2, 'Email already exists.', 400);
        }

        // Save user to the database
        const saveUserResult = await this.elasticConn.index({
            index: 'users_auth',
            document: payload,
        });

        // console.log(saveUserResult);

        return saveUserResult;
    }

    async loginUser(email: string, password: string) {
        // Check whether a user with given username exists
        const emailExistsResult = await this.elasticConn.search({
            index: 'users_auth',
            query: {
                match_phrase: {
                    email: email,
                },
            },
        });

        if (emailExistsResult.hits.total.value <= 0) {
            throw new ApiError(6, 'Bad credentials', 400);
        }

        if (
            await bcrypt.compare(
                password,
                emailExistsResult.hits.hits[0]._source.hashedPassword,
            )
        ) {
            const token = generateAuthToken(
                emailExistsResult.hits.hits[0]._id,
                email,
            );

            const refreshToken = generateRefreshToken(
                emailExistsResult.hits.hits[0]._id,
                email,
            );

            return { token, refreshToken };
        } else {
            throw new ApiError(6, 'Bad credentials', 400);
        }
    }
}
