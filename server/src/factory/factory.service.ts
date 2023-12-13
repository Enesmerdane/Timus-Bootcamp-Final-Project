import { Inject, Injectable } from '@nestjs/common';
import { FactoryDetail } from './model/factoryDetail.model';
import { FactoryInformation } from './model/factoryInformation.model';

enum QueryColumns {
    'id',
    'factory_name',
    'subscription_begin_date',
    'subscription_end_date',
    'no_of_workers',
    'free_user',
}

@Injectable()
export class FactoryService {
    constructor(@Inject('PG_CONNECTION') private pgConn: any) {}

    async getFactoryList(pageNum: number, queryOptions: any) {
        try {
            if (!queryOptions) {
                queryOptions = { column_number: 1, desc: false };
            }

            const res = await this.pgConn.query(
                `
                    SELECT * FROM factory 
                    ORDER BY ${QueryColumns[queryOptions.column_number]}
                    ${queryOptions.desc ? 'DESC' : 'ASC'} 
                    LIMIT 5 OFFSET ${(pageNum - 1) * 5} 
                `,
            );

            return { data: res };
        } catch (err) {
            console.log(err);

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

    async changeFactoryInformation(factoryInformation: FactoryInformation) {
        try {
            const res = this.pgConn.query(`
                UPDATE factory
                SET
                factory_name='${factoryInformation.factory_name}',
                subscription_begin_date=TO_DATE('${factoryInformation.subscription_start_date}', 'DD/MM/YYYY'),
                subscription_end_date=TO_DATE('${factoryInformation.subscription_end_date}', 'DD/MM/YYYY'),
                no_of_workers=${factoryInformation.no_of_workers},
                free_user=${factoryInformation.free_user}
                WHERE id='${factoryInformation.id}'
            `);
        } catch (err) {
            console.log(err);

            // TODO: Handle errors
        }
    }
}
