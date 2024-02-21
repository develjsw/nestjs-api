import { HttpException, HttpStatus } from '@nestjs/common';

export class ManagerException extends HttpException {
    constructor(readonly code: number, message: string, httpStatus: number = HttpStatus.BAD_REQUEST) {
        super(message, httpStatus);
    }
}
