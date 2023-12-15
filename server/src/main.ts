import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
const { xss } = require('express-xss-sanitizer');
import { rateLimit } from 'express-rate-limit';
import { ResponseDTO } from './dto/response.dto';
import { InputFieldException } from './exceptions/InputFieldException';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

require('dotenv').config();

async function bootstrap() {
    // Initiate Nest server
    const app = await NestFactory.create(AppModule);

    app.use(xss()); // express xss sanitizer

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
        standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
        // store: ... , // Use an external store for consistency across multiple server instances.
    });

    // Apply the rate limiting middleware to all requests.
    app.use(limiter);

    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: (errors) => {
                const resultMsg =
                    errors[0].constraints[
                        Object.keys(errors[0].constraints)[0]
                    ];
                return new InputFieldException(resultMsg);
            },
            stopAtFirstError: true,
        }),
    );

    // wrap AppModule with useContainer (for custom decorators)
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.use(cookieParser());

    // Define global base path
    app.setGlobalPrefix('api');

    const corsOptions: CorsOptions = {
        origin: 'http://localhost:3001', // Replace with your Vue.js frontend URL
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    };

    app.enableCors(corsOptions);

    // Listen server
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
