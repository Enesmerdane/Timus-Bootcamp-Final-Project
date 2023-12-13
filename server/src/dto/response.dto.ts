export class ResponseDTO {
    constructor(
        public result?: boolean,
        public statusCode?: number,
        public payload?: any,
        public errorCode?: number,
        public message?: string,
    ) {}
}
