import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestController } from './test.controller';
import { ResponseService } from '../common/response/response.service';
import { Member } from '../member/entities/member.entity';
import { TestService } from './test.service';
import { Test2Service } from './test2.service';
import { PersonService } from './extends-abstract-class/person.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Member])
    ],
    controllers: [TestController],
    providers: [ResponseService, TestService, Test2Service, PersonService]
})
export class TestModule {}
