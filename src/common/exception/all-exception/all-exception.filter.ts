import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { DBException } from '../db-exception/db-exception';

@Catch(HttpException, DBException)
export class AllExceptionFilter<T> implements ExceptionFilter {
  constructor(
      private readonly httpAdapterHost: HttpAdapterHost
  ) {}

  catch(exception: HttpException | DBException, host: ArgumentsHost): void {

    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const response = ctx.getResponse();
    const status = exception.getStatus();
    const message = exception.message;

    const responseBody = {
      status: status,
      message: message
    };

    httpAdapter.reply(
      response,
      responseBody
    );

  }
}
