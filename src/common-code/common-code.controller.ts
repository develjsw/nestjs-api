import { Controller, Get, Param } from '@nestjs/common';
import { CommonCodeService } from './common-code.service';

@Controller('common-code')
export class CommonCodeController {
  constructor(
      private readonly commonCodeService: CommonCodeService
  ) {}

  @Get()
  findAll() {
    return this.commonCodeService.findAll();
  }

  @Get(':id')
  findOne(
      @Param('id') id: string
  ) {
    return this.commonCodeService.findOne(+id);
  }

}
