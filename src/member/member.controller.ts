import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe, BadRequestException
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller('member')
export class MemberController {
  constructor(
      private readonly memberService: MemberService
  ) {}

  @Post()
  async createMember(
      @Body(new ValidationPipe()) createMemberDto: CreateMemberDto
  ) {
    const telPattern = /^[0-9]{3}-[0-9]{4}-[0-9]{4}/
    if (telPattern.test(createMemberDto.tel) === false) {
      throw new BadRequestException('연락처 형식 오류');
    }
    return await this.memberService.createMember(createMemberDto);
  }

  @Get()
  findAll() {
    return this.memberService.findAll();
  }

  @Get(':memberCd')
  async findMemberByMemberCd(
      @Param('memberCd', ParseIntPipe) memberCd: number
  ) {
    return await this.memberService.findMemberByMemberCd(memberCd);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.memberService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberService.remove(+id);
  }
}
