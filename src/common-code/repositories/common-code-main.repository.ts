import { DataSource, IsNull, Repository } from 'typeorm';
import { CommonCodeMain } from '../entities/mysql/common-code-main.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonCodeMainRepository {
    private commonCodeMainRepository: Repository<CommonCodeMain>;

    constructor(private readonly dataSource: DataSource) {
        this.commonCodeMainRepository = this.dataSource.getRepository(CommonCodeMain);
    }

    async getCommonCodeMainAndSub(): Promise<CommonCodeMain[]> {
        return await this.commonCodeMainRepository.find({
            relations: ['commonCodeSubs']
        });
    }

    async getCommonCodeMainAndSubById(mainCd: string): Promise<CommonCodeMain[]> {
        return await this.commonCodeMainRepository.find({
            where: {
                mainCd,
                isUse: 'Y',
                delDate: IsNull()
            },
            // 방식 - 1
            // relations: ['commonCodeSubs']
            // 방식 - 2
            relations: {
                commonCodeSubs: true
            }
        });
    }
}
