import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ProducerDto } from './dto/producer.dto';
import { ConsumerDto } from './dto/consumer.dto';
import { KafkaProducerService } from './kafka.producer.service';
import { KafkaConsumerService } from './kafka.consumer.service';

@Controller('kafka')
export class KafkaController {
    constructor(
        private readonly kafkaProducerService: KafkaProducerService,
        private readonly kafkaConsumerService: KafkaConsumerService
    ) {}

    @Post('producer')
    async producer(@Body(new ValidationPipe()) producerDto: ProducerDto) {
        await this.kafkaProducerService.connectProducer();
        await this.kafkaProducerService.sendMessage(
            producerDto.topic,
            producerDto.messages
        );
    }

    @Post('consumer')
    async consumer(@Body(new ValidationPipe()) consumerDto: ConsumerDto) {
        await this.kafkaConsumerService.initializeConsumer(consumerDto.topics);
    }
}
