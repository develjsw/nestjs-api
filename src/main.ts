import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AllExceptionFilter } from './common/exception/all-exception/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost); // app.get(HttpAdapterHost).httpAdapter 값을 httpAdapter 변수에 저장
  app.useGlobalFilters(
      new AllExceptionFilter(
          { httpAdapter }
      )
  );
  const configService = app.get(ConfigService);
  await app.listen(configService.get('port'));
}
bootstrap();
