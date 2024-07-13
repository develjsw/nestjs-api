import { Global, Module } from '@nestjs/common';
import { SlackModule } from './slack/slack.module';
import { RedisCacheModule } from './cache/redis-cache.module';
import { KafkaService } from './kafka/kafka.service';

@Global()
@Module({
    providers: [KafkaService],
    exports: [KafkaService],
    imports: [SlackModule, RedisCacheModule]
})
export class CommonModule {}
