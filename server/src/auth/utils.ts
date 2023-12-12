import * as jwt from 'jsonwebtoken';

require('dotenv').config();

export function generateAuthToken(userId, email): String {
    const obj = { sub: userId, email };
    const token = jwt.sign(obj, process.env.DB_SECRET, {
        expiresIn: '10m',
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
