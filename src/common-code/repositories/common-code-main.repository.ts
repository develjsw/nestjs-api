import { DataSource, Repository } from 'typeorm';
import { CommonCodeMain } from '../entities/mysql/common-code-main.entity';
import { CommonCodeSub } from '../entities/mysql/common-code-sub.entity';
import { Injectable } from '@nestjs/common';
import { TCommonCode } from '../types/common-code-type';

@Injectable()
export class CommonCodeMainRepository {
    private commonCodeMainRepository: Repository<CommonCodeMain>;

    constructor(private readonly dataSource: DataSource) {
        this.commonCodeMainRepository = this.dataSource.getRepository(CommonCodeMain);
    }

    async getSubCdsByMainCd(mainCd: string): Promise<TCommonCode[]> {
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
