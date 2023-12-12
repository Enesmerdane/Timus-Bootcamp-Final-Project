import { Module } from '@nestjs/common';
import { Pool } from 'pg';

require('dotenv').config();

const postgreDBProvider = {
    provide: 'PG_CONNECTION',
    useValue: new Pool({
        user: process.env.POSTGRE_DB_USER,
        host: process.env.POSTGRE_DB_HOST,
        database: process.env.POSTGRE_DB_NAME,
        password: process.env.POSTGRE_DB_PASSWORD,
        port: Number(process.env.POSTGRE_DB_PORT),
    }),
};

@Module({
    providers: [postgreDBProvider],
    exports: [postgreDBProvider],
})
export class PostgreDbModule {}
