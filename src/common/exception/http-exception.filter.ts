import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    NotFoundException,
    BadRequestException,
    UnauthorizedException
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseService } from '../response/response.service';
import { inspect } from 'util';
import { DBException } from './db-exception';
import { ManagerException } from './manager-exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly DEFAULT_ERROR_CODE = 9999;

    constructor(private readonly responseService: ResponseService) {}

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        console.error(
            'exception log',
            inspect(
                {
                    request: {
                        url: request.originalUrl,
                        methods: request.route ? request.route.methods : null,
                        params: request.params,
                        body: request.originalUrl ? request.body : null
                    }
                },
                false,
                null,
                true
            ),
            {
                exception
            }
        );

        let httpStatusCode: number;
        let responseObj;

        if (exception instanceof HttpException) {
            responseObj = this.responseService.start(
                undefined,
                this.getCodeByException(exception),
                exception.message
            ).response;
            httpStatusCode = this.getHttpStatusByException(exception);
        } else if (exception instanceof Error) {
            responseObj = this.responseService.start(undefined, this.DEFAULT_ERROR_CODE, exception.message).response;
        } else if (exception instanceof DBException) {
            responseObj = this.responseService.start(
                undefined,
                this.getCodeByException(exception),
                exception.message
            ).response;
        } else {
            responseObj = this.responseService.start(undefined, this.DEFAULT_ERROR_CODE).response;
        }

        response.status(httpStatusCode || HttpStatus.INTERNAL_SERVER_ERROR).json(responseObj.body);
    }

    private getCodeByException(exception: HttpException): number {
        if (exception instanceof ManagerException) {
            return exception.code;
        } else if (exception instanceof NotFoundException) {
            return 9901;
        } else if (exception instanceof BadRequestException) {
            return 9902;
        } else if (exception instanceof UnauthorizedException) {
            return 9903;
        } else if (exception instanceof DBException) {
            return 9904;
        } else {
            return this.DEFAULT_ERROR_CODE;
        }
    }

    private getHttpStatusByException(exception: HttpException): number {
        if (exception instanceof BadRequestException) {
            return 422;
        } else {
            return exception.getStatus();
        }
    }
}
