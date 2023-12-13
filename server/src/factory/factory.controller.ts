import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Query,
    Res,
    UseGuards,
} from '@nestjs/common';

import { FactoryService } from './factory.service';
import { FactoryDetail } from './model/factoryDetail.model';
import { UpdateFactoryDetailDTO } from './dto/updateFactoryDetail.dto';
import { UpdateFactoryInformationDTO } from './dto/updateFactoryInformation.dto';
import { FactoryInformation } from './model/factoryInformation.model';
import { GetFactoryListDTO } from './dto/getFactoryList.dto';
import { GetFactoryDetailsDTO } from './dto/getFactoryDetails.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { ApiError, handleError } from 'src/apiError/apiError';
import { response } from 'express';
import { ResponseDTO } from 'src/dto/response.dto';
import { AddFactoryTableColumnDTO } from './dto/addFactoryTableColumn.dto';
import { AddFactoryDetailsTableColumnDTO } from './dto/addFactoryDetailsTableColumn.dto';

@Controller()
export class FactoryController {
    constructor(private readonly factoryService: FactoryService) {}

    @UseGuards(JwtAuthGuard)
    @Get('factory')
    async getFactoryList(
        @Query('page') page,
        @Body() getFactoryListDTO: GetFactoryListDTO,
        @Res() response,
    ) {
        try {
            const queryOptions = getFactoryListDTO.order_options;

            const pageNum = Number(page) < 0 ? 0 : Number(page);

            const result = await this.factoryService.getFactoryList(
                pageNum,
                queryOptions,
            );

            return new ResponseDTO(
                true,
                200,
                result.data.rows,
                -1,
                'Factory list successfully retrieved.',
            );
        } catch (error) {
            const apiError = handleError(error);

            response.status(apiError.statusCode).json(apiError);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('factory_details/:factory_id')
    async getFactoryDetails(
        @Param('factory_id') factoryId,
        @Query('page') pageNum,
        @Body() getFactoryDetailsDTO: GetFactoryDetailsDTO,
        @Res() response,
    ) {
        try {
            const queryOptions = getFactoryDetailsDTO.order_options;
            const factoryDetails = await this.factoryService.getFactoryDetails(
                factoryId,
                Number(pageNum),
                queryOptions,
            );

            return new ResponseDTO(
                true,
                200,
                factoryDetails.data,
                -1,
                'Factory list successfully retrieved.',
            );
        } catch (error) {
            const apiError = handleError(error);

            response.status(apiError.statusCode).json(apiError);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('factory_details/:factory_details_id')
    async changeFactoryDetails(
        @Param('factory_details_id') factoryDetailsId,
        @Body() body: UpdateFactoryDetailDTO,
        @Res() response,
    ) {
        try {
            const factoryDetail: FactoryDetail = { ...body.data };

            await this.factoryService.changeFactoryDetails(factoryDetail);

            return new ResponseDTO(true, 201);
        } catch (error) {
            const apiError = handleError(error);

            response.status(apiError.statusCode).json(apiError);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('factory/:factory_id')
    async changeFactoryInformation(
        @Param('factory_id') UpdateFactoryDetailDTO,
        @Body() body: UpdateFactoryInformationDTO,
        @Res() response,
    ) {
        try {
            const factoryInformation: FactoryInformation = { ...body.data };

            await this.factoryService.changeFactoryInformation(
                factoryInformation,
            );
            return new ResponseDTO(true, 201);
        } catch (error) {
            const apiError = handleError(error);

            response.status(apiError.statusCode).json(apiError);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('factorytable')
    async addFactoryTableColumn(
        @Body() addFactoryTableColumnDTO: AddFactoryTableColumnDTO,
        @Res() response,
    ) {
        try {
            const columnOptions = addFactoryTableColumnDTO.column_options;

            // Check whether column exists
            const exists = await this.factoryService.checkFactoryColumnExists(
                columnOptions.column_name,
            );

            if (exists) {
                throw new ApiError(7, 'Column name already exists', 400);
            }

            await this.factoryService.addColumnFactoryTable(columnOptions);

            return new ResponseDTO(true, 201);
        } catch (error) {
            const apiError = handleError(error);
            console.log('yes ', error);

            response.status(apiError.statusCode).json(apiError);
        }
    }
    @UseGuards(JwtAuthGuard)
    @Put('factorydetailstable')
    async addFactoryDetailsTableColumn(
        @Body()
        addFactoryDetailsTableColumnDTO: AddFactoryDetailsTableColumnDTO,
        @Res() response,
    ) {
        try {
            const columnOptions =
                addFactoryDetailsTableColumnDTO.column_options;

            // Check whether column exists
            const exists = await this.factoryService.checkFactoryDetailsColumnExists(
                columnOptions.column_name,
            );

            if (exists) {
                throw new ApiError(7, 'Column name already exists', 400);
            }

            await this.factoryService.addColumnFactoryDetailsTable(
                columnOptions,
            );

            return new ResponseDTO(true, 201);
        } catch (error) {
            console.log(error);

            const apiError = handleError(error);

            response.status(apiError.statusCode).json(apiError);
        }
    }
}
