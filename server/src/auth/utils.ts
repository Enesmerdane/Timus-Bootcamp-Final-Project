import * as jwt from 'jsonwebtoken';

require('dotenv').config();

export function generateAuthToken(userId, email): String {
    const obj = { sub: userId, email };
    const token = jwt.sign(obj, process.env.DB_SECRET, {
        expiresIn: '10m',
    });
    return token;
}
