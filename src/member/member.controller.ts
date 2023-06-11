import {
  Controller,
  Get, Post, Patch, Delete,
  Body, Param, Query,
  ParseIntPipe, ValidationPipe,
  BadRequestException
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { ModifyMemberDto } from './dto/modify-member.dto';
import { ListMemberDto } from './dto/list-member.dto';

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
  async getMemberList(
      @Query(new ValidationPipe()) listMemberDto: ListMemberDto
  ) {
    return await this.memberService.getMemberList(listMemberDto);
  }

  @Get(':memberCd')
  async findMemberByMemberCd(
      @Param('memberCd', ParseIntPipe) memberCd: number
  ) {
    return await this.memberService.findMemberByMemberCd(memberCd);
  }

  @Patch(':memberCd')
  async modifyMember(
      @Param('memberCd', ParseIntPipe) memberCd: number,
      @Body(new ValidationPipe()) updateMemberDto: ModifyMemberDto
  ) {
    return await this.memberService.modifyMember(memberCd, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberService.remove(+id);
  }
}
