export class FactoryDetail {
    constructor(
        public readonly id: string,
        public readonly factory_id: string,
        public readonly start_date: Date,
        public readonly end_date: Date,
        public readonly unit: string,
        public readonly usage: number,
        public readonly usage_fee: number,
        public readonly discounted_fee: boolean
    ) {}
}
