export class FactoryInformation {
    constructor(
        public readonly id: string,
        public readonly factory_name: string,
        public readonly subscription_start_date: Date,
        public readonly subscription_end_date: Date,
        public readonly no_of_workers: number,
        public readonly free_user: boolean,
    ) {}
}
