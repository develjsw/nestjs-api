import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonCodeMain } from './entities/common-code-main.entity';
import { CommonCodeSub } from './entities/common-code-sub.entity';
import * as _ from 'lodash';

@Injectable()
export class CommonCodeService {

  constructor(
      @InjectRepository(CommonCodeMain)
      private commonCodeMainRepository: Repository<CommonCodeMain>,
      @InjectRepository(CommonCodeSub)
      private commonCodeSubRepository: Repository<CommonCodeSub>
  ) {
  }

  async getAllListByGroup() {
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

  // TODO : return type 추가 예정
  async findSubCdListByMainCd(mainCd: string) {
    return await this.commonCodeMainRepository
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
  }

}
