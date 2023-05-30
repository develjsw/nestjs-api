import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configurationLocal from './config/configuration.local';
import configurationDevelopment from './config/configuration.development';
import configurationProduction from './config/configuration.production';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonCodeModule } from './common-code/common-code.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptor/response-interceptor';
import { MemberModule } from './member/member.module';

let configuration;
if (process.env.NODE_ENV === 'production') {
    configuration = configurationProduction;
} else if (process.env.NODE_ENV === 'development') {
    configuration = configurationDevelopment;
} else {
    configuration = configurationLocal;
}

@Module({
  /* module */
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        cache: true,
        load: [
            configuration
        ]
      }),
      /* TypeOrm 설정 */
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) =>
              configService.get('database'),
          inject: [ConfigService]
      }),
      CommonCodeModule,
      MemberModule,
  ],
  /* controller */
  controllers: [AppController],
  /* service */
  providers: [
      AppService,
      {
        provide: APP_INTERCEPTOR,
        useClass: ResponseInterceptor
      }
  ],
})
export class AppModule {}
