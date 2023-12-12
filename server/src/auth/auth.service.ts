import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt'; // for encrypting the password

import { User } from './model/user.model';
import { generateAuthToken, generateRefreshToken } from './utils';
@Injectable()
export class AuthService {
    constructor(@Inject('ELASTICSEARCH_CONNECTION') private elasticConn: any) {}

    async createUser(payload: User) {
        try {
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
                // TODO: Error handling
                return { error: 'user with given username exists' };
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
                // TODO: Error handling
                return { error: 'user with given email exists' };
            }

            // Save user to the database
            const res = await this.elasticConn.index({
                index: 'users_auth',
                document: payload,
            });

            return res;
        } catch (err) {
            // TODO: Error handling
        }
    }

    async loginUser(email: string, password: string) {
        try {
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
                // TODO: Error handling
                return { error: 'user not found' };
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
                    email
                )

                return { token, refreshToken };
            } else {
                return { msg: 'fail' };
            }
        } catch (err) {
            // TODO: Error handling
        }
    }

    async validateUser(email: string, password: string): Promise<any> {
        const emailExistsResult = await this.elasticConn.search({
            index: 'users_auth',
            query: {
                match_phrase: {
                    email: email,
                },
            },
        });
        //const user = await this.usersService.findOne(username);
        if (
            await bcrypt.compare(
                password,
                emailExistsResult.hits.hits[0]._source.hashedPassword,
            )
        ) {
            return email;
        }
        return null;
    }
}
