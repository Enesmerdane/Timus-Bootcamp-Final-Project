import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseDTO } from 'src/dto/response.dto';
import { InputFieldException } from 'src/exceptions/InputFieldException';

@Catch(InputFieldException)
export class InputFieldExceptionFilter implements ExceptionFilter {
    catch(exception: InputFieldException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response
            .status(status)
            // you can manipulate the response here
            .json(new ResponseDTO(false, status, {}, 5, exception.message));
    }
}
