import { Controller, Get, Post, Patch, Delete, Body, Param, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import {
    DeleteResponse,
    InsertResponse,
    ResponseService,
    TResponseOfPaging,
    UpdateResponse
} from '../common/response/response.service';
import { MemberService } from './servicies/member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { ModifyMemberDto } from './dto/modify-member.dto';
import { ListMemberDto } from './dto/list-member.dto';
import { ManagerException } from '../common/exception/manager-exception';
import { Member } from './entities/mysql/member.entity';

@Controller('members')
export class MemberController {
    constructor(private readonly responseService: ResponseService, private readonly memberService: MemberService) {}

    @Post()
    async createMember(@Body(new ValidationPipe()) dto: CreateMemberDto) {
        const telPattern = /^[0-9]{3}-[0-9]{4}-[0-9]{4}/;
        if (!telPattern.test(dto.tel)) {
            throw new ManagerException(9902, 'Invalid tel number format');
        }

        const result: InsertResponse = await this.memberService.createMember(dto);

        return this.responseService.start(result).responseBody;
    }

    @Get()
    async getMembersWithPaging(@Query(new ValidationPipe()) dto: ListMemberDto) {
        const result: TResponseOfPaging<Member> = await this.memberService.getMembersWithPaging(dto);

        return this.responseService.start(result).responseBody;
    }

    @Get(':id')
    async getMemberById(@Param('id', ParseIntPipe) memberId: number) {
        const result: Member = await this.memberService.getMemberById(memberId);

        return this.responseService.start(result).responseBody;
    }

    @Patch(':id')
    async updateMemberById(
        @Param('id', ParseIntPipe) memberId: number,
        @Body(new ValidationPipe()) dto: ModifyMemberDto
    ) {
        const result: UpdateResponse = await this.memberService.updateMemberById(memberId, dto);

        return this.responseService.start(result).responseBody;
    }

    @Delete(':id')
    async deleteMemberById(@Param('id', ParseIntPipe) memberId: number) {
        const result: DeleteResponse = await this.memberService.deleteMemberById(memberId);

        return this.responseService.start(result).responseBody;
    }
}
