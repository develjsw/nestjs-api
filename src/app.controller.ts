import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('health')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @SkipThrottle()
    @Get()
    health(): string {
        return this.appService.health();
    }
}
