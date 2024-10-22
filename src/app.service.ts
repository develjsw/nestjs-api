import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    health(): string {
        console.log('health check');
        return 'health check';
    }
}
