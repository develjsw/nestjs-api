import { DataSource, Repository } from 'typeorm';
import { CommonCodeMain } from '../entities/common-code-main.entity';
import { CommonCodeSub } from '../entities/common-code-sub.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonCodeMainRepository {
    private commonCodeMainRepository: Repository<CommonCodeMain>;

    constructor(private readonly dataSource: DataSource) {
        this.commonCodeMainRepository = this.dataSource.getRepository(CommonCodeMain);
    }

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
