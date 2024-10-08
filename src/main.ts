import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { ResponseService } from './common/response/response.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new HttpExceptionFilter(app.get(ResponseService)));

    const configService = app.get(ConfigService);
    await app.listen(configService.get<number>('port'));
}
bootstrap();
