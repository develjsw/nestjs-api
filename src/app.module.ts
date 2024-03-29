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
import { AuthModule } from './auth/auth.module';
import { TestModule } from './test/test.module';

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
        CommonModule,
        CommonCodeModule,
        MemberModule,
        AuthModule,
        TestModule
    ],
    /* controller */
    controllers: [AppController],
    /* service */
    providers: [AppService]
})
export class AppModule {}
