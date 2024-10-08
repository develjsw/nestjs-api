import { HttpException, HttpStatus } from '@nestjs/common';

export class DBException extends HttpException {
    readonly code: number = 9904;

    constructor(message: string, httpStatus: number = HttpStatus.INTERNAL_SERVER_ERROR) {
        super(message, httpStatus);
    }
}
