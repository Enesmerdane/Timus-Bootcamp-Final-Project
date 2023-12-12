import { Controller, Get, Query } from '@nestjs/common';

import { FactoryService } from './factory.service';

@Controller('factory')
export class FactoryController {
    constructor(private readonly factoryService: FactoryService) {}

    @Get()
    async getFactoryList(@Query('page') page) {
        try {
            const pageNum = page < 0 ? 0 : page;

            const result = await this.factoryService.getFactoryList(pageNum);

            return result.data.rows;
        } catch (err) {
            // TODO: Handle errors
        }
    }
}
