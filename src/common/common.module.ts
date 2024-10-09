import { Global, Module } from '@nestjs/common';
import { SlackModule } from './slack/slack.module';
import { RedisCacheModule } from './cache/redis-cache.module';
import { ShortUrlModule } from './short-url/bitly/short-url.module';
import { ChangeFormatService } from './helper/change-format.service';

@Global()
@Module({
    providers: [ChangeFormatService],
    exports: [ChangeFormatService],
    imports: [SlackModule, RedisCacheModule, ShortUrlModule]
})
export class CommonModule {}
