import { Inject, Injectable, Scope } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { ModifyMemberDto } from './dto/modify-member.dto';
import { DBException } from '../common/exception/db-exception';
import { plainToClass } from 'class-transformer';
import { ListMemberDto } from './dto/list-member.dto';
import { SlackService } from '../common/slack/slack.service';
import {
    InsertResponse,
    UpdateResponse,
    DeleteResponse,
    TResponseOfPaging
} from '../common/response/response.service';
import { MemberRepository } from './repositories/member.repository';
import * as moment from 'moment/moment';
import { Member } from './entities/mysql/member.entity';

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

    async createMember(
        createMemberDto: CreateMemberDto
    ): Promise<InsertResponse> {
        const memberDto = plainToClass(CreateMemberDto, createMemberDto);
        memberDto.regDate = this.nowDate;

        try {
            return await this.memberRepository.createMember(memberDto);
        } catch (error) {
            await this.slackService.send(
                `회원 생성 도중 에러 발생! - ${error}`
            );
            throw new DBException(error.message);
        }
    }

    async getMemberList(
        listMemberDto: ListMemberDto
    ): Promise<TResponseOfPaging> {
        const page = listMemberDto.page;
        const pageSize = listMemberDto.pageSize;
        const skip = (page - 1) * pageSize;

        const list = await this.memberRepository.getMemberList(pageSize, skip);

        const convertList = list.map((item: Member) => {
            return {
                memberCd: item.memberCd,
                memberNm: item.memberNm,
                nickName: item.nickName,
                tel: item.tel,
                email: item.email,
                status: item.status,
                regDate: item.regDate
                    ? moment(item.regDate).format('YYYY-MM-DD HH:mm:ss')
                    : null,
                modDate: item.modDate
                    ? moment(item.modDate).format('YYYY-MM-DD HH:mm:ss')
                    : null,
                delDate: item.delDate
                    ? moment(item.delDate).format('YYYY-MM-DD HH:mm:ss')
                    : null,
                dropDate: item.dropDate
                    ? moment(item.dropDate).format('YYYY-MM-DD HH:mm:ss')
                    : null
            };
        });

        const totalCount = await this.memberRepository.getMemberListCount();

        return {
            pagingInfo: { page, totalCount },
            list: convertList
        };
    }

    async findMemberByMemberCd(memberCd: number): Promise<Member | object> {
        const detail: Member | null =
            await this.memberRepository.getMemberByCode(memberCd);

        if (!detail) {
            return {};
        }

        return {
            ...detail,
            // detail 내부 데이터의 일부를 converting 하는 것이므로 전개연산자를 사용하되, converting 대상만 아래와 같이 진행
            regDate: detail.regDate
                ? moment(detail.regDate).format('YYYY-MM-DD HH:mm:ss')
                : null,
            modDate: detail.modDate
                ? moment(detail.modDate).format('YYYY-MM-DD HH:mm:ss')
                : null,
            delDate: detail.delDate
                ? moment(detail.delDate).format('YYYY-MM-DD HH:mm:ss')
                : null,
            dropDate: detail.dropDate
                ? moment(detail.dropDate).format('YYYY-MM-DD HH:mm:ss')
                : null
        };
    }

    async modifyMember(
        memberCd: number,
        modifyMemberDto: ModifyMemberDto
    ): Promise<UpdateResponse> {
        const memberDto = plainToClass(ModifyMemberDto, modifyMemberDto);
        memberDto.modDate = this.nowDate;

        try {
            return await this.memberRepository.modifyMember(
                memberCd,
                memberDto
            );
        } catch (error) {
            await this.slackService.send(
                `회원 수정 도중 에러 발생! - ${error}`
            );
            throw new DBException(error.message);
        }
    }

    // Hard Delete
    async removeMember(memberCd: number): Promise<DeleteResponse> {
        try {
            return await this.memberRepository.removeMember(memberCd);
        } catch (error) {
            await this.slackService.send(
                `회원 삭제 도중 에러 발생! - ${error}`
            );
            throw new DBException(error.message);
        }
    }
}
