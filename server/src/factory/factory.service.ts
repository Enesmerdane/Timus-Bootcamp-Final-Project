import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FactoryService {
    constructor(@Inject('PG_CONNECTION') private pgConn: any) {}

    async getFactoryList(pageNum: number) {
        try {
            console.log(pageNum);

            const res = await this.pgConn.query(
                `
                    SELECT * FROM factory LIMIT 5 OFFSET ${(pageNum - 1) * 5}
                `,
            );

            return { data: res };
        } catch (err) {
            // TODO: Error handling
        }
    }
}
