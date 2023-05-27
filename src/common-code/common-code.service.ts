import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonCodeMain } from './entities/common-code-main.entity';
import { CommonCodeSub } from './entities/common-code-sub.entity';

@Injectable()
export class CommonCodeService {

  constructor(
      @InjectRepository(CommonCodeMain)
      private commonCodeMainRepository: Repository<CommonCodeMain>
  ) {
  }

  async getAllListByGroup() {
    // TODO : 관계 설정된 부분을 바탕으로 group 데이터 출력 예정
    return await this.commonCodeMainRepository.find();
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
