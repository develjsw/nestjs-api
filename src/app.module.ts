import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configurationLocal from './config/configuration.local';
import configurationDevelopment from './config/configuration.development';
import configurationProduction from './config/configuration.production';

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
      })
  ],
  /* controller */
  controllers: [AppController],
  /* service */
  providers: [AppService],
})
export class AppModule {}
