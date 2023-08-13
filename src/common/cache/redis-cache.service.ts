import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
    constructor(
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache
    ) {}

    /**
     * 캐시 가져오기
     * @param key
     */
    async get(key: string): Promise<any> {
        return await this.cacheManager.get(key);
    }

    /**
     * 캐시 저장
     * @param key - key
     * @param value - value
     * @param option - TTL(Milliseconds) 값으로 optional 매개 변수
     */
    async set(key: string, value: any, option?: any): Promise<void> {
        await this.cacheManager.set(key, value, option);
    }

    /**
     * 전체 캐시 삭제
     */
    async reset(): Promise<void> {
        await this.cacheManager.reset();
    }

    /**
     * 캐시 항목 삭제
     * @param key
     */
    async del(key: string): Promise<void> {
        await this.cacheManager.del(key);
    }
}