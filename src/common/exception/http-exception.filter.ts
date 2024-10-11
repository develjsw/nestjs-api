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
import { ThrottlerException } from '@nestjs/throttler';

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

        // HttpException 처리
        if (exception instanceof HttpException) {
            const exceptionResponse = exception.getResponse();
            const message = this.extractMessage(exceptionResponse);

            responseObj = this.responseService.start(undefined, this.getCodeByException(exception), message).response;

            httpStatusCode = this.getHttpStatusByException(exception);
        }
        // DBException, Error 처리
        else if (exception instanceof DBException || exception instanceof Error) {
            const message = exception.message || 'Internal server error';
            responseObj = this.responseService.start(undefined, this.getCodeByException(exception), message).response;
            httpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        // 그 외의 예외 처리
        else {
            responseObj = this.responseService.start(undefined, this.DEFAULT_ERROR_CODE).response;
            httpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        response.status(httpStatusCode).json(responseObj.body);
    }

    private extractMessage(exceptionResponse: any): string {
        // 문자열인 경우 그대로 반환
        if (typeof exceptionResponse === 'string') {
            return exceptionResponse;
        }
        // 객체인 경우 JSON 문자열로 변환하거나 기본 메시지를 반환
        if (typeof exceptionResponse === 'object' && exceptionResponse.message) {
            return Array.isArray(exceptionResponse.message)
                ? exceptionResponse.message.join(', ') // 배열인 경우 메시지를 결합하여 반환
                : exceptionResponse.message;
        }
        return 'An error occurred';
    }

    private getCodeByException(exception: any): number {
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
        } else if (exception instanceof ThrottlerException) {
            return 9998;
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
