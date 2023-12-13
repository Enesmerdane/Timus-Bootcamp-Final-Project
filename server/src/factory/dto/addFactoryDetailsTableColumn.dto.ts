enum columnTypeEnum {
    'text',
    'integer',
    'decimal',
    'boolean',
    'date',
}

export class AddFactoryDetailsTableColumnDTO {
    column_options: {
        column_name: string;
        column_type: columnTypeEnum;
    };
}
