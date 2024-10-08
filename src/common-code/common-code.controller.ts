import { Controller, Get, Param } from '@nestjs/common';
import { ResponseService } from '../common/response/response.service';
import { CommonCodeService } from './common-code.service';
import { TCommonCode, TCommonCodeGroup } from './types/common-code-type';

@Controller('common-codes')
export class CommonCodeController {
    constructor(
        private readonly responseService: ResponseService,
        private readonly commonCodeService: CommonCodeService
    ) {}

    @Get()
    async getAllListByGroup() {
        const result: TCommonCodeGroup = await this.commonCodeService.getAllListByGroup();

        return this.responseService.start(result).responseBody;
    }

    @Get('/:id/sub-codes')
    async findSubCdListByMainCd(@Param('id') main_cd: string) {
        const result: TCommonCode[] = await this.commonCodeService.findSubCdListByMainCd(main_cd);

        return this.responseService.start(result).responseBody;
    }
}
