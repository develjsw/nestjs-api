import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { RedisCacheService } from '../common/cache/redis-cache.service';
import { redisKey } from '../config/redis-key';
import { CommonCodeMainRepository } from './repository/common-code-main.repository';
import { CommonCodeSubRepository } from './repository/common-code-sub.repository';
import { DBException } from '../common/exception/db-exception';

@Injectable()
export class CommonCodeService {
    constructor(
        @Inject(RedisCacheService)
        private redisCacheService: RedisCacheService,
        private readonly commonCodeMainRepository: CommonCodeMainRepository,
        private readonly commonCodeSubRepository: CommonCodeSubRepository
    ) {}

  async getAllListByGroup(): Promise<any> {
      try {
          return await this.commonCodeSubRepository.getAllListByGroup()
      } catch (error: any) {
          throw new DBException(error.message);
      }
  }

  async findSubCdListByMainCd(mainCd: string) {
      try {
          const redisValue = await this.redisCacheService.get(
              await this.modifyRedisKey(redisKey.inApi.common.code.main, mainCd, '{mainCd}')
          );

          if (redisValue) {
              return redisValue
          } else {
              const result = await this.commonCodeMainRepository.findSubCdListByMainCd(mainCd)
              if (result.length) {
                  await this.redisCacheService.set(
                      await this.modifyRedisKey(redisKey.inApi.common.code.main, mainCd, '{mainCd}'), result, 1000 * 60
                  );
              }
              return result;
          }
      } catch (error: any) {
          // TODO : Error 예외처리 변경예정
          throw new InternalServerErrorException()
      }
  }

    async modifyRedisKey(redisKey: string, target: string, replace: any): Promise<string> {
        return redisKey.replace(replace, target);
    }

    /**
     * @deprecated - set data of redis
     */
    async testSetDataOfRedis(): Promise<void> {
        await this.redisCacheService.set('testKey', { testValue: 'test01' }, 60000);
    }

    /**
     * @deprecated - get data of redis
     */
    async testGetDataOfRedis(): Promise<any> {
        return await this.redisCacheService.get('testKey');
    }

}
