import { DataSource } from 'typeorm';
import { TestDto } from './dto/test.dto';
import { Member } from '../member/entities/member.entity';
import { plainToInstance } from 'class-transformer';
import { TransactionService } from '../common/transaction/transaction.service';
import { DBException } from '../common/exception/db-exception';
import { InternalServerErrorException } from '@nestjs/common';

export class Test2Service extends TransactionService {
    constructor(private dataSource: DataSource) {
        super(dataSource);
    }

    async secondInsertQuery(testDto: TestDto) {
        const queryRunner = await this.makeQueryRunner();
        await this.startTransaction();
        console.log("3번");
        try {
            testDto.nickName += "_추가되는 내용";
            await queryRunner.manager.save(plainToInstance(Member, testDto));

            //throw new InternalServerErrorException(); // 롤백 확인용2

            console.log("3-1번 (commit)");
            await this.commitTransaction();
        } catch (error: any) {
            console.log("3-2번 (rollback)");
            await this.rollbackTransaction();
            if (error instanceof DBException) {
                throw error;
            } else {
                throw new InternalServerErrorException();
            }
        } finally {
            console.log("3-3번 (release)");
            await this.releaseQueryRunner();
        }
    }
}