import { Module } from '@nestjs/common';
import { ShortUrlService } from './short-url.service';

@Module({
    imports: [],
    providers: [ShortUrlService],
    exports: [ShortUrlService],
})
export class ShortUrlModule {}