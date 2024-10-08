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
}
