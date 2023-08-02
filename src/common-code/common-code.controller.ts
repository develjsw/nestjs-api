import {
  Controller,
  Get,
  Param,
  Post,
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
  async testGetDataOfRedis(): Promise<void> {
    await this.commonCodeService.testGetDataOfRedis();
  }
}
