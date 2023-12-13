import { Inject, Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class AppService {
    constructor(@Inject('ELASTICSEARCH_CONNECTION') private elasticConn: any) {}
}
