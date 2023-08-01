import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { RedisCacheService } from './redis-cache.service';

@Global()
@Module({
  imports: [
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
