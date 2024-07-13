import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EachMessagePayload, Kafka } from 'kafkajs';

@Injectable()
export class KafkaService {
    private kafka = new Kafka({
        clientId: "peter's kafka",
        brokers: ['localhost:9094']
    });
    private producer = this.kafka.producer();
    private consumer = this.kafka.consumer({ groupId: "peter's kafka group" });

    constructor() {
        this.consumer.connect().catch(() => {
            throw new InternalServerErrorException();
        }); //접속
        this.consumer.subscribe({ topics: ['test_a', 'test_b'] }).catch(() => {
            throw new InternalServerErrorException();
        }); //구독
        this.consumer
            .run({
                //메세지 수신
                eachMessage: this.consumerCallback //메세지 수신 콜백
            })
            .then();
    }

    async consumerCallback(payload: EachMessagePayload) {
        //메세지 수신 콜백
        console.log('kafka message arrived');
        console.log(
            `topic: ${
                payload.topic
            }, Message:${payload.message.value.toString()}`
        );
    }
}
