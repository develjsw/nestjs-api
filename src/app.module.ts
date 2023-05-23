import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configurationLocal from './config/configuration.local';
import configurationDevelopment from './config/configuration.development';
import configurationProduction from './config/configuration.production';
import { TypeOrmModule } from '@nestjs/typeorm';

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
      // TODO : forRoot → forRootAsync 교체 예정
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.DATABASE_HOST,
          port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
          username: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_SCHEMA,
          entities: [__dirname + '/**/*.entity{.ts,.js}'], // entity 인식
          synchronize: false,
          logging: 'all'
      })
  ],
  /* controller */
  controllers: [AppController],
  /* service */
  providers: [AppService],
})
export class AppModule {}
