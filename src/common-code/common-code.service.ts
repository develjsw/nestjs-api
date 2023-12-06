import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonCodeMain } from './entities/common-code-main.entity';
import { CommonCodeSub } from './entities/common-code-sub.entity';
import * as _ from 'lodash';
import { RedisCacheService } from '../common/cache/redis-cache.service';
import { redisKey } from '../config/redis-key';

@Injectable()
export class CommonCodeService {
  constructor(
      @InjectRepository(CommonCodeMain)
      private commonCodeMainRepository: Repository<CommonCodeMain>,
      @InjectRepository(CommonCodeSub)
      private commonCodeSubRepository: Repository<CommonCodeSub>,
      @Inject(RedisCacheService)
      private redisCacheService: RedisCacheService
  ) {
  }

  // TODO : Converting 후 반환 타입 넣기
  async getAllListByGroup(): Promise<any> {
      const rawDataList = await this.commonCodeSubRepository
          .createQueryBuilder('ccs')
          .select([
              'ccm.mainCd as mainCd',
              'ccm.mainNm as mainNm',
              'ccs.subCd as subCd',
              'ccs.subNm as subNm',
              'ccs.codeDesc as codeDesc',
              'ccs.sortNo as sortNo',
          ])
          .leftJoin(CommonCodeMain, 'ccm', 'ccs.mainCd = ccm.mainCd')
          .where('ccs.isUse = "Y"')
          .andWhere('ccm.isUse = "Y"')
          .andWhere('ccs.delDate IS NULL')
          .andWhere('ccm.delDate IS NULL')
          .orderBy('ccs.sortNo', 'ASC')
          .execute();

      return _.groupBy(rawDataList, 'mainCd');
  }

  // TODO : Converting 후 반환 타입 넣기
  async findSubCdListByMainCd(mainCd: string) {
      const redisKeyOfMainCd = await this.modifyRedisKey(redisKey.inApi.common.code.main, mainCd, '{mainCd}');
      const redisValue = await this.redisCacheService.get(redisKeyOfMainCd);

      if (redisValue) {
          return redisValue
      } else {
          const result = await this.commonCodeMainRepository
              .createQueryBuilder('ccm')
              .select([
                'ccm.mainCd as mainCd',
                'ccm.mainNm as mainNm',
                'ccs.subCd as subCd',
                'ccs.subNm as subNm',
                'ccs.sortNo as sortNo'
              ])
              .leftJoin(CommonCodeSub, 'ccs', 'ccm.mainCd = ccs.mainCd')
              .where('ccm.mainCd = :mainCd', { mainCd })
              .andWhere('ccm.isUse = "Y"')
              .andWhere('ccm.delDate IS NULL')
              .andWhere('ccs.isUse = "Y"')
              .andWhere('ccs.delDate IS NULL')
              .orderBy('ccs.sortNo', 'ASC')
              .execute();

          if (result.length) {
              await this.redisCacheService.set(
                  await this.modifyRedisKey(redisKey.inApi.common.code.main, mainCd, '{mainCd}'), result, 1000 * 60
              );
          }
          return result;
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
