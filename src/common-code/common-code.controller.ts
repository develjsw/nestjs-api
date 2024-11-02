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
        const result: CommonCodeMain[] = await this.commonCodeService.getCommonCodeMainAndSub();

        return this.responseService.start(result).responseBody;
    }

    @Get('/:id/sub-codes')
    async getCommonCodeMainById(@Param('id') mainCd: string) {
        const result: CommonCodeMain[] = await this.commonCodeService.getCommonCodeMainById(mainCd);

        return this.responseService.start(result).responseBody;
    }
}
