import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * nestjs-in-api - health check
   */
  @Get()
  health(): string {
    return this.appService.health();
  }
}
