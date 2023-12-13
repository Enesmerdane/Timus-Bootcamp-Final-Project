import { HttpException } from '@nestjs/common';

export class InputFieldException extends HttpException {
    constructor(public message: string) {
        super('', 400);
    }
}
