import { Module, CacheModule, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { RedisCacheService } from './redis-cache.service';

@Global()
@Module({
  imports: [
      // TODO : CacheModule - Deprecated 대체 할 부분 확인하기.
      CacheModule.register({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
              store: redisStore,
              host: configService.get('database.redis.host'),
              port: configService.get('database.redis.port'),
              ttl: configService.get('database.redis.defaultTTL')
          })
      })
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService]
})
export class RedisCacheModule {}
