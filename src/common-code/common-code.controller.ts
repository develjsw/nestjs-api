import {
  Controller,
  Get,
  Param,
  ValidationPipe
} from '@nestjs/common';
import { CommonCodeService } from './common-code.service';
import { FilterCommonCodeDto } from './dto/filter-common-code.dto';

@Controller('commonCode')
export class CommonCodeController {
  constructor(
      private readonly commonCodeService: CommonCodeService
  ) {}

  @Get()
  async getAllListByGroup() {
    return await this.commonCodeService.getAllListByGroup();
  }

  @Get('/:mainCd/subCodes')
  async findSubCdListByMainCd(
      @Param(new ValidationPipe()) filterCommonCodeDto: FilterCommonCodeDto
  ) {
    return await this.commonCodeService.findSubCdListByMainCd(
        filterCommonCodeDto.mainCd
    );
  }

}
