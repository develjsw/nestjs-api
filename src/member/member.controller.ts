import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    Query,
    ParseIntPipe,
    ValidationPipe,
    BadRequestException
} from '@nestjs/common';
import { ResponseService } from '../common/response/response.service';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { ModifyMemberDto } from './dto/modify-member.dto';
import { ListMemberDto } from './dto/list-member.dto';

@Controller('member')
export class MemberController {
    constructor(
        private readonly responseService: ResponseService,
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
        const result = await this.memberService.createMember(createMemberDto)
        return this.responseService.start(result).responseBody;
    }

    @Get()
    async getMemberList(
        @Query(new ValidationPipe()) listMemberDto: ListMemberDto
    ) {
        return this.responseService.start(
            await this.memberService.getMemberList(listMemberDto)
        ).responseBody;
    }

    @Get(':memberCd')
    async findMemberByMemberCd(
        @Param('memberCd', ParseIntPipe) memberCd: number
    ) {
        return this.responseService.start(
            await this.memberService.findMemberByMemberCd(memberCd)
        ).responseBody;
    }

    @Patch(':memberCd')
    async modifyMember(
        @Param('memberCd', ParseIntPipe) memberCd: number,
        @Body(new ValidationPipe()) updateMemberDto: ModifyMemberDto
    ) {
        const result = await this.memberService.modifyMember(memberCd, updateMemberDto);
        return this.responseService.start(result).responseBody;
    }

    @Delete(':memberCd')
    async removeMember(
        @Param('memberCd', ParseIntPipe) memberCd: number
    ) {
        const result = await this.memberService.removeMember(memberCd);
        return this.responseService.start(result).responseBody
    }
}
