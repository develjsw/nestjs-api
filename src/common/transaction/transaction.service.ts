import { Connection, QueryRunner } from 'typeorm';

export abstract class TransactionService {
    protected preparedQueryRunner?: QueryRunner; // 전달 받은 QueryRunner
    private queryRunner?: QueryRunner // 진행 상태의 QueryRunner

    protected constructor(
        protected readonly connection: Connection
    ) {}

    // 앞 서비스에서 선행 생성된 QueryRunner 전달
    setQueryRunner(queryRunner: QueryRunner): this {
        this.preparedQueryRunner = queryRunner;
        return this;
    }

    protected async makeQueryRunner():Promise<QueryRunner> {
        if (this.preparedQueryRunner) {
            return (this.queryRunner = this.preparedQueryRunner);
        } else {
            this.queryRunner = this.connection.createQueryRunner();
            await this.queryRunner.connect();
            return this.queryRunner;
        }
    }

    protected async releaseQueryRunner(): Promise<void> {
        if (this.preparedQueryRunner) {
            this.preparedQueryRunner = null;
        } else {
            await this.queryRunner.release();
        }
        this.queryRunner = null;
    }

    protected async startTransaction(): Promise<void> {
        if (!this.preparedQueryRunner) {
            await this.queryRunner.startTransaction();
        }
    }

    protected async commitTransaction(): Promise<void> {
        if (!this.preparedQueryRunner) {
            await this.queryRunner.commitTransaction();
        }
    }

    protected async rollbackTransaction(): Promise<void> {
        if (!this.preparedQueryRunner) {
            await this.queryRunner.rollbackTransaction();
        }
    }
}
