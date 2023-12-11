import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDTO } from './dto/createUser.dto';

import { User } from './model/user.model';

@Injectable()
export class AuthService {
    constructor(@Inject('ELASTICSEARCH_CONNECTION') private elasticConn: any) {}

    async createUser(payload: User) {
        try {
            const id = uuidv4();

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
}
