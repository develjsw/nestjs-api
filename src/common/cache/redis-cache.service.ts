import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

    /**
     * 캐시 가져오기
     * @param key
     */
    async get(key: string): Promise<any> {
        return await this.cache.get(key);
    }

    /**
     * 캐시 저장
     * @param key
     * @param value
     * @param option
     */
    async set(key: string, value: any, option?: any): Promise<void> {
        await this.cache.set(key, value, option);
    }

    /**
     * 전체 캐시 삭제
     */
    async reset(): Promise<void> {
        await this.cache.reset();
    }

    /**
     * 캐시 항목 삭제
     * @param key
     */
    async del(key: string): Promise<void> {
        await this.cache.del(key);
    }
}