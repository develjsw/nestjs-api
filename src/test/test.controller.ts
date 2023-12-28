import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  ValidationPipe,
  BadRequestException,
  Inject,
  UnprocessableEntityException
} from '@nestjs/common'
import { ResponseService } from '../common/response/response.service'
import { TestService } from './test.service'
import { TestDto } from './dto/test.dto'
import { PersonService } from './extends-abstract-class/person.service'

@Controller('test')
export class TestController {
    // DI 방식 1 - 데코레이터를 통한 주입 방법
    // @Inject(TestService)
    // private testService: TestService

    constructor(
        private readonly responseService: ResponseService,
        // DI 방식 2 - 생성자에서 주입하는 방법
        private testService: TestService,
        private personService: PersonService,
    ) {}

    @Post('transaction')
    async transactionTest(
      @Body(new ValidationPipe()) testDto: TestDto
    ) {
        await this.testService.transactionTestForTwoInsertQuery(testDto);
    }

    @Get('extents-abstract-class')
    async extentsAbstractClass() {
        const result = await this.personService.getJobInfoOfEachPerson(
            'web-developer', { 'kind': ['Front-End', 'Back-End'] } // Test Case1
            //'qa-tester', { 'work': ['요구사항 명세 분석', '테스트 계획 작성', '테스트 진행'] } // Test Case2
        );
        return this.responseService.start(result).responseBody
    }
}
