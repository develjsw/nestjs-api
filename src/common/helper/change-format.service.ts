import { Injectable } from '@nestjs/common';

@Injectable()
export class ChangeFormatService {
    async changeFormatOfRedisKey(redisKey: string, target: string[], replace: string[]): Promise<string> {
        return target.reduce((acc, cur, idx) => acc.replace(cur, replace[idx]), redisKey);
    }
}
