import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

require('dotenv').config();

async function bootstrap() {
    // Initiate Nest server
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    // Define global base path
    app.setGlobalPrefix('api');

    // Listen server
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
