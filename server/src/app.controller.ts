import { Body, Controller, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post()
    getHello(@Body() body, @Req() req) {
        console.log(req.body);

        return body;
    }
}
