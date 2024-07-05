import { TestDto } from '../../dto/test.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from '../../../member/entities/mysql/member.entity';
import { DataSource, Repository } from 'typeorm';
import { DBException } from '../../../common/exception/db-exception';
import { InternalServerErrorException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { TransactionService } from '../../../common/transaction/transaction.service';
import { LastQueryExecuteService } from './last-query-execute.service';

export class FirstQueryExecuteService extends TransactionService {
    private testDto: TestDto;

    constructor(
        @InjectRepository(Member)
        private memberRepository: Repository<Member>,
        protected readonly dataSource: DataSource,
        private lastQueryExecuteService: LastQueryExecuteService
    ) {
        super(dataSource);
    }

    async transactionTestForTwoInsertQuery(testDto: TestDto) {
        this.testDto = testDto;

        const queryRunner = await this.makeQueryRunner();
        await this.startTransaction();
        console.log('1번');

        try {
            await this.firstInsertQuery(queryRunner);
            await this.lastQueryExecuteService
                .setQueryRunner(queryRunner)
                .secondInsertQuery(this.testDto);

            console.log('4-1번 (commit)');
            await this.commitTransaction();
        } catch (error) {
            console.log('4-2번 (rollback)');
            await this.rollbackTransaction();
            if (error instanceof DBException) {
                throw error;
            } else {
                throw new InternalServerErrorException();
            }
        } finally {
            console.log('4-3번 (release)');
            await this.releaseQueryRunner();
        }
    }

    async firstInsertQuery(queryRunner) {
        console.log('2번');
        try {
            await queryRunner.manager.save(
                plainToInstance(Member, this.testDto)
            );
            // throw new InternalServerErrorException(); // 롤백 확인용1
        } catch (error: any) {
            throw new DBException(error.message);
        }
    }
}
