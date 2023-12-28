import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestController } from './test.controller';
import { ResponseService } from '../common/response/response.service';
import { FirstQueryExecuteService } from './transaction/prepared-query-runner/first-query-execute.service';
import { LastQueryExecuteService } from './transaction/prepared-query-runner/last-query-execute.service';
import { PersonService } from './extends-abstract-class/person.service';
import { Member } from '../member/entities/member.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Member])
    ],
    controllers: [TestController],
    providers: [
        ResponseService,
        FirstQueryExecuteService,
        LastQueryExecuteService,
        PersonService
    ]
})
export class TestModule {}
