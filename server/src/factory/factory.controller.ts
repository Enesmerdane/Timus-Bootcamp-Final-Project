import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';

import { FactoryService } from './factory.service';
import { FactoryDetail } from './model/factoryDetail.model';
import { plainToClass } from 'class-transformer';
import { UpdateFactoryDetailDTO } from './dto/updateFactoryDetail.dto';
import { UpdateFactoryInformationDTO } from './dto/updateFactoryInformation.dto';
import { FactoryInformation } from './model/factoryInformation.model';

@Controller()
export class FactoryController {
    constructor(private readonly factoryService: FactoryService) {}

    @Get('factory')
    async getFactoryList(@Query('page') page) {
        try {
            const pageNum = Number(page) < 0 ? 0 : Number(page);

            const result = await this.factoryService.getFactoryList(pageNum);

            return result.data.rows;
        } catch (err) {
            // TODO: Handle errors
        }
    }

    @Get('factory_details/:factory_id')
    async getFactoryDetails(
        @Param('factory_id') factoryId,
        @Query('page') pageNum,
    ) {
        try {
            const factoryDetails = await this.factoryService.getFactoryDetails(
                factoryId,
                Number(pageNum),
            );

            return factoryDetails;
        } catch (err) {
            // TODO: Handle errors
        }
    }

    @Put('factory_details/:factory_details_id')
    async changeFactoryDetails(
        @Param('factory_details_id') factoryDetailsId,
        @Body() body: UpdateFactoryDetailDTO,
    ) {
        try {
            const factoryDetail: FactoryDetail = { ...body.data };

            const result =
                await this.factoryService.changeFactoryDetails(factoryDetail);
        } catch (err) {
            console.log(err);
            // TODO: Handle Errors
        }
    }

    @Put('factory/:factory_id')
    async changeFactoryInformation(
        @Param('factory_id') UpdateFactoryDetailDTO,
        @Body() body: UpdateFactoryInformationDTO,
    ) {
        try {
            const factoryInformation: FactoryInformation = { ...body.data };

            const result =
                await this.factoryService.changeFactoryInformation(
                    factoryInformation,
                );
        } catch (err) {
            console.log(err);
            // TODO: Handle Errors
        }
    }
}
