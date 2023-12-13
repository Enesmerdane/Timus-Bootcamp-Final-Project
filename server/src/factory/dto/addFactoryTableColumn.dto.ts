enum columnTypeEnum {
    'text',
    'integer',
    'decimal',
    'boolean',
    'date',
}

export class AddFactoryTableColumnDTO {
    column_options: {
        column_name: string;
        column_type: columnTypeEnum;
    };
}
