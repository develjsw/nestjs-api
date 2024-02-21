import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisCacheService } from './redis-cache.service';

@Global()
@Module({
    imports: [
        CacheModule.registerAsync<RedisClientOptions>({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                store: await redisStore,
                socket: {
                    host: configService.get('database.redis.host'),
                    port: configService.get('database.redis.port')
                    // TODO : module에서 설정한 ttl 값이 적용되지 않는 이슈가 존재하여 사용하는 곳에서 option으로 설정 중
                    //ttl: configService.get('database.redis.defaultTTL')
                }
            })
        })
    ],
    providers: [RedisCacheService],
    exports: [RedisCacheService]
})
export class RedisCacheModule {}
