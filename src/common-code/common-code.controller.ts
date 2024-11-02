import { Controller, Get, Param } from '@nestjs/common';
import { ResponseService } from '../common/response/response.service';
import { CommonCodeService } from './servicies/common-code.service';
import { CommonCodeMain } from './entities/mysql/common-code-main.entity';

@Controller('common-codes')
export class CommonCodeController {
    constructor(
        private readonly responseService: ResponseService,
        private readonly commonCodeService: CommonCodeService
    ) {}

    @Get()
    async getCommonCodeMainAndSub() {
        const result: CommonCodeMain[] = await this.commonCodeService.findCommonCodeMainAndSub();

        return this.responseService.start(result).responseBody;
    }

    @Get('/:id/sub-codes')
    async getCommonCodeMainAndSubById(@Param('id') mainCd: string) {
        const result: CommonCodeMain[] = await this.commonCodeService.findCommonCodeMainAndSubById(mainCd);

        return this.responseService.start(result).responseBody;
    }
}
