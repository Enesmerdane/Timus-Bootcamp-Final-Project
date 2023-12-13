import { Inject, Injectable } from '@nestjs/common';
import { FactoryDetail } from './model/factoryDetail.model';
import { FactoryInformation } from './model/factoryInformation.model';

enum QueryColumnsFactory {
    'id',
    'factory_name',
    'subscription_begin_date',
    'subscription_end_date',
    'no_of_workers',
    'free_user',
}

enum QueryColumnsFactoryDetail {
    'id',
    'factory_id',
    'start_date',
    'end_date',
    'unit',
    'usage',
    'usage_fee',
    'discounted_fee',
}

@Injectable()
export class FactoryService {
    constructor(@Inject('PG_CONNECTION') private pgConn: any) {}

    async getFactoryList(pageNum: number, queryOptions?: any) {
        if (!queryOptions) {
            queryOptions = { column_number: 1, desc: false };
        }

        const res = await this.pgConn.query(
            `
                    SELECT * FROM factory 
                    ORDER BY ${QueryColumnsFactory[queryOptions.column_number]}
                    ${queryOptions.desc ? 'DESC' : 'ASC'} 
                    LIMIT 5 OFFSET ${(pageNum - 1) * 5} 
                `,
        );

        return { data: res };
    }

    async getFactoryDetails(
        factoryId: string,
        pageNum: number,
        queryOptions?: any,
    ) {
        if (!queryOptions) {
            queryOptions = { column_number: 2, desc: false };
        }
        const res = await this.pgConn.query(
            `
                    SELECT * FROM factory_details WHERE factory_id='${factoryId}' 
                    ORDER BY ${
                        QueryColumnsFactoryDetail[queryOptions.column_number]
                    }
                    ${queryOptions.desc ? 'DESC' : 'ASC'} 
                    LIMIT 5 OFFSET ${(pageNum - 1) * 5}
                `,
        );
        return { data: res.rows };
    }

    async changeFactoryDetails(factoryDetail: FactoryDetail) {
        await this.pgConn.query(`
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

        const columnNameTypes = (
            await this.pgConn.query(`
            SELECT column_name, data_type
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_NAME='factory_details'
        `)
        ).rows;

        // Generate query
        let queryText = `
            UPDATE factory_details 
            SET 
            `;

        //console.log(columnNameTypes);

        Object.keys(factoryDetail).forEach((key, index, arr) => {
            if (!(key === 'id' || key === 'factory_id')) {
                let filteredData = columnNameTypes.filter(
                    (obj) => obj.column_name === key,
                );
                let type;
                if (filteredData.length !== 0) {
                    type = filteredData[0].data_type;
                }

                const value = factoryDetail[key];

                if (type === 'date') {
                    queryText += `${key}=TO_DATE('${value}', 'DD/MM/YYYY')`;
                } else if (type === 'character varying') {
                    queryText += `${key}='${value}'`;
                } else {
                    queryText += `${key}=${value}`;
                }

                if (index !== arr.length - 1) {
                    queryText += ', ';
                } else {
                    queryText += ' ';
                }
            }
        });

        queryText += `WHERE id='${factoryDetail.id}'`;

        //console.log(queryText);

        await this.pgConn.query(queryText);

        // await this.pgConn.query(`
        //         UPDATE factory_details
        //         SET
        //         start_date=TO_DATE('${factoryDetail.start_date}', 'DD/MM/YYYY'),
        //         end_date=TO_DATE('${factoryDetail.end_date}', 'DD/MM/YYYY'),
        //         unit='${factoryDetail.unit}',
        //         usage=${factoryDetail.usage},
        //         usage_fee=${factoryDetail.usage},
        //         discounted_fee=${factoryDetail.discounted_fee}
        //         WHERE id='${factoryDetail.id}'
        //     `);
    }

    async changeFactoryInformation(factoryInformation: FactoryInformation) {
        await this.pgConn.query(`
                UPDATE factory
                SET
                factory_name='${factoryInformation.factory_name}',
                subscription_begin_date=TO_DATE('${factoryInformation.subscription_start_date}', 'DD/MM/YYYY'),
                subscription_end_date=TO_DATE('${factoryInformation.subscription_end_date}', 'DD/MM/YYYY'),
                no_of_workers=${factoryInformation.no_of_workers},
                free_user=${factoryInformation.free_user}
                WHERE id='${factoryInformation.id}'
            `);
    }

    async addColumnFactoryTable(columnOptions: any) {
        let dataType =
            columnOptions.column_type === 'text'
                ? 'varchar(255)'
                : columnOptions.column_type;

        await this.pgConn.query(`
            ALTER TABLE factory
            ADD ${columnOptions.column_name} ${dataType}
        `);
    }

    async addColumnFactoryDetailsTable(columnOptions: any) {
        let dataType =
            columnOptions.column_type === 'text'
                ? 'varchar(255)'
                : columnOptions.column_type;

        await this.pgConn.query(`
            ALTER TABLE factory_details
            ADD ${columnOptions.column_name} ${dataType}
        `);
    }

    async checkFactoryColumnExists(name: string) {
        const result = await this.pgConn.query(`
            SELECT column_name
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_NAME='factory'
        `);

        const exists = result.rows.some((element) => {
            return element.column_name === name;
        });

        return exists;
    }

    async checkFactoryDetailsColumnExists(name: string) {
        const result = await this.pgConn.query(`
            SELECT column_name
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_NAME='factory_details'
        `);

        const exists = result.rows.some((element) => {
            return element.column_name === name;
        });

        return exists;
    }

    async deleteColumnFactoryTable(name: string) {
        await this.pgConn.query(`
            ALTER TABLE factory
            DROP ${name}
        `);
    }

    async deleteColumnFactoryDetailsTable(name: string) {
        await this.pgConn.query(`
            ALTER TABLE factory_details
            DROP ${name}
        `);
    }
}
