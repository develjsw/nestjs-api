import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import configurationLocal from './config/configuration.local';
// import configurationDevelopment from './config/configuration.development';
// import configurationProduction from './config/configuration.production';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { CommonCodeModule } from './common-code/common-code.module';
import { MemberModule } from './member/member.module';
import { SlackModule } from 'nestjs-slack-webhook';
import { TestModule } from './test/test.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { GoodsModule } from './goods/goods.module';
import * as path from 'path';

// let configuration;
// switch (process.env.NODE_ENV) {
//     case 'production':
//         configuration = configurationProduction;
//         break;
//     case 'development':
//         configuration = configurationDevelopment;
//         break;
//     default:
//         configuration = configurationLocal;
//         break;
// }

let envFile = 'env.local';
switch (process.env.NODE_ENV) {
    case 'production':
        envFile = 'env.production';
        break;
    case 'development':
        envFile = 'env.development';
        break;
}

@Module({
    /* module */
    imports: [
        // ConfigModule.forRoot({
        //     isGlobal: true,
        //     cache: true,
        //     load: [configuration]
        // }),
        ConfigModule.forRoot({
            envFilePath: [
                path.resolve(__dirname, `../${envFile}`) // 환경에 맞는 파일 경로 설정
            ],
            isGlobal: true,
            cache: true
        }),
        /* TypeOrm 설정 */
        // TypeOrmModule.forRootAsync({
        //     imports: [ConfigModule],
        //     useFactory: (configService: ConfigService) => configService.get('database.dbMysql'),
        //     inject: [ConfigService]
        // }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>('DATABASE_HOST'),
                port: configService.get<number>('DATABASE_PORT'),
                database: configService.get<string>('DATABASE_NAME'),
                username: configService.get<string>('DATABASE_USERNAME'),
                password: configService.get<string>('DATABASE_PASSWORD'),
                schema: configService.get<string>('DATABASE_SCHEMA'),
                entities: ['dist/**/entities/mysql/*.entity{.ts,.js}'], // entity 인식
                subscribers: ['dist/**/entities/mysql/*.subscriber{.ts,.js}'], // subscribe 인식
                synchronize: false,
                logging: 'all'
            }),
            inject: [ConfigService]
        }),
        /* SlackWebHook 설정 */
        // SlackModule.forRootAsync({
        //     imports: [ConfigModule],
        //     inject: [ConfigService],
        //     useFactory: (configService: ConfigService) => configService.get('slack')
        // }),
        SlackModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                url: configService.get<string>('SLACK_WEBHOOK_URL')
            }),
            inject: [ConfigService]
        }),
        /* Throttler 설정 */
        // ThrottlerModule.forRootAsync({
        //     imports: [ConfigModule],
        //     inject: [ConfigService],
        //     useFactory: (configService: ConfigService) => [configService.get('throttler')]
        // }),
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                throttlers: [
                    {
                        ttl: configService.get<number>('THROTTLER_TTL'),
                        limit: configService.get<number>('THROTTLER_LIMIT')
                    }
                ]
            })
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
