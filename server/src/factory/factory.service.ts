import { Inject, Injectable } from '@nestjs/common';
import { FactoryDetail } from './model/factoryDetail.model';

@Injectable()
export class FactoryService {
    constructor(@Inject('PG_CONNECTION') private pgConn: any) {}

    async getFactoryList(pageNum: number) {
        try {
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

    async getFactoryDetails(factoryId: string, pageNum: number) {
        try {
            const res = await this.pgConn.query(
                `
                    SELECT * FROM factory_details WHERE factory_id='${factoryId}' LIMIT 5 OFFSET ${
                        (pageNum - 1) * 5
                    }
                `,
            );
            return { data: res.rows };
        } catch (err) {
            console.log(err);

            // TODO: Handle errors
        }
    }

    async changeFactoryDetails(factoryDetail: FactoryDetail) {
        try {
            console.log(factoryDetail);

            const res = this.pgConn.query(`
                UPDATE factory_details 
                SET
                start_date=TO_DATE('${factoryDetail.start_date}', 'DD/MM/YYYY'),
                end_date=TO_DATE('${factoryDetail.end_date}', 'DD/MM/YYYY'),
                unit='${factoryDetail.unit}',
                usage=${factoryDetail.usage},
                usage_fee=${factoryDetail.usage},
                discounted_fee=${factoryDetail.discounted_fee}
                WHERE id='${factoryDetail.id}'
            `);
        } catch (err) {
            console.log(err);

            // TODO: Handle errors
        }
    }
}
