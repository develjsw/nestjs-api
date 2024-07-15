import { Global, Module } from '@nestjs/common';
import { SlackModule } from './slack/slack.module';
import { RedisCacheModule } from './cache/redis-cache.module';

@Global()
@Module({
    providers: [],
    exports: [],
    imports: [SlackModule, RedisCacheModule]
})
export class CommonModule {}
