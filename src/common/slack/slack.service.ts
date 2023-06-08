import { Injectable } from '@nestjs/common';
import { InjectSlack } from 'nestjs-slack-webhook';
import { IncomingWebhook, IncomingWebhookSendArguments } from '@slack/client';

@Injectable()
export class SlackService {
    @InjectSlack()
    private readonly slack: IncomingWebhook;

    private async notify(args: IncomingWebhookSendArguments) {
        return await this.slack.send(args);
    }

    async send(text: string): Promise<void> {
        await this.notify({
            text
        })
    }

}
