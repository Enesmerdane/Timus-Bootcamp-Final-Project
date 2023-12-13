export function handleError(error: any) {
    if (error instanceof ApiError) {
        return error;
    } else {
        return new ApiError(error.code, error.message, 400);
    }
}

export class ApiError extends Error {
    constructor(
        public errorCode: number,
        public message: string,
        public statusCode: number,
    ) {
        super();
    }
}
/**
 * errorCode:
 * 1 --> username already exists
 * 2 --> email already exists
 * 3 --> invalid user role
 * 4 --> unexpected user while creating user
 * 5 --> error on input fields
 */
