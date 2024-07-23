import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EachMessagePayload, Kafka, Consumer } from 'kafkajs';

@Injectable()
export class KafkaConsumerService {
    private kafka: Kafka;
    private consumer: Consumer;
    private isConnected = false;
    private isSubscribed = false;

    constructor() {
        this.kafka = new Kafka({
            clientId: 'property-test',
            brokers: ['kafka-1:9094', 'kafka-2:9095', 'kafka-3:9096']
        });

        this.consumer = this.kafka.consumer({
            groupId: 'my-group'
        });
    }

    async connectConsumer(): Promise<void> {
        if (this.isConnected) {
            console.log('Consumer already connected');
            return;
        }

        try {
            console.log('Connecting consumer...');
            await this.consumer.connect();
            this.isConnected = true;
            console.log('Consumer connected');
        } catch (error) {
            console.error('Error in connectConsumer:', error);
            throw new InternalServerErrorException(error);
        }
    }

    async subscribe(topics: string[]): Promise<void> {
        if (this.isSubscribed) {
            console.log('Consumer already subscribed');
            return;
        }

        try {
            console.log('Subscribing to topics:', topics);
            for (const topic of topics) {
                await this.consumer.subscribe({ topic, fromBeginning: true });
            }
            this.isSubscribed = true;
            console.log('Subscription completed');
        } catch (error) {
            console.error('Error in subscribe:', error);
            throw new InternalServerErrorException(error);
        }
    }

    async startConsumer(): Promise<void> {
        await this.consumer.run({
            eachMessage: async (payload: EachMessagePayload) => {
                await this.consumerCallback(payload);
            }
        });
    }

    // TODO : 해당 부분은 상속받아서 customizing 할 수 있도록 변경 필요
    async consumerCallback(payload: EachMessagePayload): Promise<void> {
        console.log('Kafka message arrived');
        console.log(`
            Topic: ${payload.topic},
            Partition: ${payload.partition},
            Offset: ${payload.message.offset},
            Message: ${payload.message.value.toString()}
        `);
    }

    async initializeConsumer(topics: string[]): Promise<void> {
        await this.connectConsumer();
        await this.subscribe(topics);
        await this.startConsumer();
    }
}
