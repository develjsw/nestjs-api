import { Inject, Injectable, Scope } from '@nestjs/common';
import { CreateMemberDto } from '../dto/create-member.dto';
import { ModifyMemberDto } from '../dto/modify-member.dto';
import { DBException } from '../../common/exception/db-exception';
import { plainToClass } from 'class-transformer';
import { ListMemberDto } from '../dto/list-member.dto';
import { SlackService } from '../../common/slack/slack.service';
import {
    InsertResponse,
    UpdateResponse,
    DeleteResponse,
    TResponseOfPaging
} from '../../common/response/response.service';
import { MemberRepository } from '../repositories/member.repository';
import { Member } from '../entities/mysql/member.entity';
import { ManagerException } from '../../common/exception/manager-exception';

@Injectable({ scope: Scope.REQUEST })
export class MemberService {
    private readonly nowDate;

    constructor(
        @Inject(SlackService)
        private readonly slackService: SlackService,
        private readonly memberRepository: MemberRepository
    ) {
        this.nowDate = new Date();
    }

    async createMember(dto: CreateMemberDto): Promise<InsertResponse> {
        const memberDto = plainToClass(CreateMemberDto, dto);
        memberDto.regDate = this.nowDate;

        try {
            return await this.memberRepository.createMember(memberDto);
        } catch (error) {
            await this.slackService.send(`회원 생성 도중 에러 발생! - ${error}`);
            throw new DBException(error.message);
        }
    }

    async getMembersWithPaging(dto: ListMemberDto): Promise<TResponseOfPaging<Member>> {
        const page: number = dto.page;
        const pageSize: number = dto.pageSize;
        const skip: number = (page - 1) * pageSize;

        const totalCount: number = await this.memberRepository.getCountMembers();

        if (!totalCount) {
            throw new ManagerException(9902, 'Not Found - Members');
        }

        const members: Member[] = await this.memberRepository.getMembersWithPaging(pageSize, skip);

        return {
            pagingInfo: { page, totalCount },
            list: members
        };
    }

    async getMemberById(memberId: number): Promise<Member> {
        const detail: Member | null = await this.memberRepository.getMemberByCode(memberId);

        if (!detail) {
            throw new ManagerException(9902, 'Not Found - Member');
        }

        return detail;
    }

    async updateMemberById(memberId: number, dto: ModifyMemberDto): Promise<UpdateResponse> {
        const memberDto = plainToClass(ModifyMemberDto, dto);
        memberDto.modDate = this.nowDate;

        try {
            return await this.memberRepository.updateMemberById(memberId, memberDto);
        } catch (error) {
            await this.slackService.send(`회원 수정 도중 에러 발생! - ${error}`);
            throw new DBException(error.message);
        }
    }

    async deleteMemberById(memberId: number): Promise<DeleteResponse> {
        try {
            return await this.memberRepository.deleteMemberById(memberId);
        } catch (error) {
            await this.slackService.send(`회원 삭제 도중 에러 발생! - ${error}`);
            throw new DBException(error.message);
        }
    }
}
