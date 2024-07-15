import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EachMessagePayload, Kafka, Partitioners, Producer } from 'kafkajs';

@Injectable()
export class KafkaService {
    private kafka: Kafka;

    constructor() {
        this.kafka = new Kafka({
            clientId: 'property-test',
            brokers: ['localhost:9094']
        });
    }

    async processConsumer(topics: string[]): Promise<void> {
        const consumerRes = this.kafka.consumer({
            groupId: 'my-group'
        });

        try {
            console.log('Connecting consumer...');
            await consumerRes.connect();
            console.log('Consumer connected');

            console.log('Subscribing to topics:', topics);
            await consumerRes.subscribe({ topics });
            console.log('Subscription completed');

            await consumerRes.run({
                eachMessage: async (payload: EachMessagePayload) => {
                    await this.consumerCallback(payload);
                }
            });
            console.log('Consumer is running');
        } catch (error) {
            console.error('Error in processConsumer:', error);
            throw new InternalServerErrorException(error);
        }
    }

    async processProducer(
        topic: string,
        messages: { value: string }[]
    ): Promise<void> {
        const params = {
            topic,
            messages
        };

        const producerRes: Producer = this.kafka.producer({
            createPartitioner: Partitioners.LegacyPartitioner // 기존 파티셔닝 방식 사용
        });

        try {
            console.log('Connecting producer...');
            await producerRes.connect();
            console.log('Producer connected');

            console.log('Sending messages:', params);
            const result = await producerRes.send(params);
            console.log('Producer result:', result);
        } catch (error) {
            console.error('Error in processProducer:', error);
            throw new InternalServerErrorException(error);
        }
    }

    async consumerCallback(payload: EachMessagePayload): Promise<void> {
        // 메세지 수신 콜백
        console.log('Kafka message arrived');
        console.log(
            `Topic: ${
                payload.topic
            }, Message: ${payload.message.value.toString()}`
        );
    }
}
