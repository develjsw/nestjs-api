import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { KafkaService } from './kafka.service';
import { ProducerDto } from './dto/producer.dto';
import { ConsumerDto } from './dto/consumer.dto';

@Controller('kafka')
export class KafkaController {
    constructor(private readonly kafkaService: KafkaService) {}

    @Post('producer')
    async producer(@Body(new ValidationPipe()) producerDto: ProducerDto) {
        await this.kafkaService.processProducer(
            producerDto.topic,
            producerDto.messages
        );
    }

    @Post('consumer')
    async consumer(@Body(new ValidationPipe()) consumerDto: ConsumerDto) {
        await this.kafkaService.processConsumer(consumerDto.topics);
    }
}
