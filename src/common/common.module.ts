import { Global, Module } from '@nestjs/common';
import { SlackModule } from './slack/slack.module';

@Global()
@Module({
    providers: [],
    exports: [],
    imports: [
        SlackModule
    ]
})
export class CommonModule {}
