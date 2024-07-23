import { Module } from '@nestjs/common';
import { KafkaController } from './kafka.controller';
import { KafkaProducerService } from './kafka.producer.service';
import { KafkaConsumerService } from './kafka.consumer.service';

@Module({
    imports: [],
    controllers: [KafkaController],
    providers: [KafkaProducerService, KafkaConsumerService],
    exports: []
})
export class KafkaModule {}
