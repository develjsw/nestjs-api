import { QueryRunner } from 'typeorm';

export abstract class TransactionService {
    private queryRunner?: QueryRunner // 진행 상태의 QueryRunner

    protected async makeQueryRunner(): Promise<QueryRunner> {
        await this.queryRunner.connect();
        return this.queryRunner;
    }

    protected async releaseQueryRunner(): Promise<void> {
        await this.queryRunner.release();
    }

    protected async startTransaction(): Promise<void> {
        await this.queryRunner.startTransaction();
    }

    protected async commitTransaction(): Promise<void> {
        await this.queryRunner.commitTransaction();
    }

    protected async rollbackTransaction(): Promise<void> {
        await this.queryRunner.rollbackTransaction();
    }
}