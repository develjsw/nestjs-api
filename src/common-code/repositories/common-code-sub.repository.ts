import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CommonCodeSub } from '../entities/mysql/common-code-sub.entity';
import { CommonCodeMain } from '../entities/mysql/common-code-main.entity';
import * as _ from 'lodash';

@Injectable()
export class CommonCodeSubRepository {
    private commonCodeSubRepository: Repository<CommonCodeSub>;

    constructor(private readonly dataSource: DataSource) {
        this.commonCodeSubRepository =
            this.dataSource.getRepository(CommonCodeSub);
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
                'ccs.sortNo as sortNo'
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
}
