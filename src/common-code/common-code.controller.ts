import { Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { ResponseService } from '../common/response/response.service';
import { CommonCodeService } from './common-code.service';
import { FilterCommonCodeDto } from './dto/filter-common-code.dto';

@Controller('commonCode')
export class CommonCodeController {
    constructor(
        private readonly responseService: ResponseService,
        private readonly commonCodeService: CommonCodeService
    ) {}

    @Get()
    async getAllListByGroup() {
        return this.responseService.start(
            await this.commonCodeService.getAllListByGroup()
        ).responseBody;
    }

    @Get('/:mainCd/subCodes')
    async findSubCdListByMainCd(
        @Param(new ValidationPipe()) filterCommonCodeDto: FilterCommonCodeDto
    ) {
        return this.responseService.start(
            await this.commonCodeService.findSubCdListByMainCd(
                filterCommonCodeDto.mainCd
            )
        ).responseBody;
    }

    /**
     * @deprecated - set data of redis
     */
    @Post('/test/redis')
    async testSetDataOfRedis(): Promise<void> {
        await this.commonCodeService.testSetDataOfRedis();
    }

    /**
     * @deprecated - get data of redis
     */
    @Get('/test/redis')
    async testGetDataOfRedis(): Promise<any> {
        const getDataOfRedis =
            await this.commonCodeService.testGetDataOfRedis();
        return this.responseService.start(
            getDataOfRedis
                ? getDataOfRedis
                : '저장되어 있는 값이 없습니다. \n데이터 생성 API 호출 후 재시도 해주시기 바랍니다. - post:/commonCode/test/redis'
        ).responseBody;
    }
}
