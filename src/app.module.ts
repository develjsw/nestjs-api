import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configurationLocal from './config/configuration.local';
import configurationDevelopment from './config/configuration.development';
import configurationProduction from './config/configuration.production';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { CommonCodeModule } from './common-code/common-code.module';
import { MemberModule } from './member/member.module';
import { SlackModule } from 'nestjs-slack-webhook';
import { TestModule } from './test/test.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { GoodsModule } from './goods/goods.module';

let configuration;
switch (process.env.NODE_ENV) {
    case 'production':
        configuration = configurationProduction;
        break;
    case 'development':
        configuration = configurationDevelopment;
        break;
    default:
        configuration = configurationLocal;
        break;
}

@Module({
    /* module */
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [configuration]
        }),
        /* TypeOrm 설정 */
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => configService.get('database.dbMysql'),
            inject: [ConfigService]
        }),
        /* SlackWebHook 설정 */
        SlackModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => configService.get('slack')
        }),
        /* Throttler 설정 */
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => [configService.get('throttler')]
        }),
        CommonModule,
        CommonCodeModule,
        MemberModule,
        GoodsModule,
        TestModule
    ],
    /* controller */
    controllers: [AppController],
    /* service, repository */
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ]
})
export class AppModule {}
