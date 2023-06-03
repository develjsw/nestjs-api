import { HttpException, HttpStatus } from '@nestjs/common';

export class DBException extends HttpException {
    constructor(message: string) {
        super(`DB Error - ${message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}