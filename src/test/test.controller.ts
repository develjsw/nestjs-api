import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { ResponseService } from '../common/response/response.service';
import { TestDto } from './dto/test.dto';
import { PersonService } from './extends-abstract-class/person.service';
import { FirstQueryExecuteService } from './transaction/prepared-query-runner/first-query-execute.service';
import { DeveloperService } from './implements-interface/developer.service';
import { DesignerService } from './implements-interface/designer.service';
import { PromiseFunctionService } from './promise-function/promise-function.service';

@Controller('test')
export class TestController {
    // DI 방식 1 - 데코레이터를 통한 주입 방법
    // @Inject(TestService)
    // private testService: TestService

    constructor(
        private readonly responseService: ResponseService,
        // DI 방식 2 - 생성자에서 주입하는 방법
        // private testService: TestService,
        private firstQueryExecuteService: FirstQueryExecuteService,
        private personService: PersonService,
        private developerService: DeveloperService,
        private designerService: DesignerService,
        private promiseFunctionService: PromiseFunctionService
    ) {}

    @Post('transaction/prepared-query-runner')
    async testPreparedQueryRunner(@Body(new ValidationPipe()) testDto: TestDto) {
        await this.firstQueryExecuteService.transactionTestForTwoInsertQuery(testDto);
    }

    @Get('extents-abstract-class')
    async extentsAbstractClass() {
        const result = await this.personService.getJobInfoOfEachPerson(
            'web-developer',
            { kind: ['Front-End', 'Back-End'] } // Test Case1
            //'qa-tester', { 'work': ['요구사항 명세 분석', '테스트 계획 작성', '테스트 진행'] } // Test Case2
        );
        return this.responseService.start(result).responseBody;
    }

    @Get('implements-interface')
    async implementsInterface() {
        const result = await this.developerService.getPersonInfo(); // Test Case1
        //const result = await this.designerService.getPersonInfo(); // Test Case2
        return this.responseService.start(result).responseBody;
    }

    @Get('promise-function-all')
    async promiseFunctionAll() {
        await this.promiseFunctionService.promiseFunctionAll();
    }

    @Get('promise-function-allSettled')
    async promiseFunctionAllSettled() {
        await this.promiseFunctionService.promiseFunctionAllSettled();
    }
}
