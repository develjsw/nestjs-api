import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { RedisCacheService } from '../../common/cache/redis-cache.service';
import { redisKey } from '../../config/redis-key';
import { CommonCodeMainRepository } from '../repositories/common-code-main.repository';
import { CommonCodeMain } from '../entities/mysql/common-code-main.entity';
import { ManagerException } from '../../common/exception/manager-exception';
import { ChangeFormatService } from '../../common/helper/change-format.service';

@Injectable()
export class CommonCodeService {
    constructor(
        @Inject(RedisCacheService)
        private redisCacheService: RedisCacheService,
        private readonly changeFormatService: ChangeFormatService,
        private readonly commonCodeMainRepository: CommonCodeMainRepository
    ) {}

    async findCommonCodeMainAndSub(): Promise<CommonCodeMain[]> {
        const result: CommonCodeMain[] = await this.commonCodeMainRepository.findCommonCodeMainAndSub();

        if (!result.length) {
            throw new ManagerException(9902, 'Not Found - CommonCodeMains');
        }

        return result;
    }

    async findCommonCodeMainAndSubById(mainCd: string): Promise<CommonCodeMain[]> {
        const key = await this.changeFormatService.changeFormatOfRedisKey(
            redisKey.inApi.common.code.main,
            [mainCd],
            ['{mainCd}']
        );
        const cacheData = await this.redisCacheService.get(key);

        if (cacheData) {
            return cacheData;
        }

        try {
            const result: CommonCodeMain[] = await this.commonCodeMainRepository.findCommonCodeMainAndSubById(mainCd);

            if (result.length) {
                await this.redisCacheService.set(key, result, 1000 * 60);
            }

            return result;
        } catch (error) {
            throw new InternalServerErrorException('Error - Fetching CommonCodeMains');
        }
    }
}
