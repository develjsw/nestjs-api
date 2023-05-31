import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionFilter<T> implements ExceptionFilter {
  constructor(
      private readonly httpAdapterHost: HttpAdapterHost
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {

    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus =
        exception instanceof HttpException
            ? exception.getStatus() // code 값 ex) 404 ...
            : HttpStatus.INTERNAL_SERVER_ERROR; // 500 Error

    // TODO : timestamp, path 제거 예정 / desc, message 추가 예정
    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()), // 요청 url path 정보 ex) /member/create123456789
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
