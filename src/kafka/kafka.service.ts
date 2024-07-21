import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
    EachMessagePayload,
    Kafka,
    Partitioners,
    Producer,
    Consumer,
    logLevel,
    RecordMetadata
} from 'kafkajs';

@Injectable()
export class KafkaService {
    private kafka: Kafka;

    constructor() {
        this.kafka = new Kafka({
            clientId: 'property-test',
            brokers: ['localhost:9094']
            //logLevel: logLevel.DEBUG // DEBUG 로그 레벨 설정
        });
    }

    async processConsumer(topics: string[]): Promise<void> {
        const consumer: Consumer = this.kafka.consumer({
            /*
                groupId를 기준으로 새로운 메세지가 있는 경우에만 consumer 대상군 노출됨
                따라서 groupId를 다르게 생성하면 새로운 groupId로 consumer 전체 대상군을 계속 소비 가능
                EX)
                    groupId: `my-group-${new Date().getTime()}` // 새로운 consumer group id 사용
                    groupId: 'groupId: my-group-1721278528048' // consumer group id 고정값
             */
            groupId: 'my-group' // consumer group id 고정
        });

        try {
            console.log('Connecting consumer...');
            await consumer.connect();
            console.log('Consumer connected');

            console.log('Subscribing to topics:', topics);
            for (const topic of topics) {
                await consumer.subscribe({ topic, fromBeginning: true });
            }
            console.log('Subscription completed');

            await consumer.run({
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

        const producer: Producer = this.kafka.producer({
            createPartitioner: Partitioners.LegacyPartitioner // 기존 파티셔닝 방식 사용
        });

        try {
            console.log('Connecting producer...');
            await producer.connect();
            console.log('Producer connected');

            console.log('Sending messages:', params);
            const result: RecordMetadata[] = await producer.send(params);
            console.log('Producer result:', result);
        } catch (error) {
            console.error('Error in processProducer:', error);
            throw new InternalServerErrorException(error);
        }
    }

    async consumerCallback(payload: EachMessagePayload): Promise<void> {
        // 메시지 수신 콜백
        console.log('Kafka message arrived');
        console.log(`
            Topic: ${payload.topic},
            Partition: ${payload.partition},
            Offset: ${payload.message.offset},
            Message: ${payload.message.value.toString()}
        `);
    }
}
