import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Member } from '../entities/mysql/member.entity';
import { CreateMemberDto } from '../dto/create-member.dto';
import { ModifyMemberDto } from '../dto/modify-member.dto';
import {
    DeleteResponse,
    InsertResponse,
    UpdateResponse
} from '../../common/response/response.service';

@Injectable()
export class MemberRepository {
    private memberRepository: Repository<Member>;

    constructor(private readonly dataSource: DataSource) {
        this.memberRepository = dataSource.getRepository(Member);
    }

    async createMember(
        createMemberDto: CreateMemberDto
    ): Promise<InsertResponse> {
        const result = await this.memberRepository.insert(createMemberDto);
        const { identifiers: memberCdList } = result;
        const memberCds = memberCdList.map((item) => {
            return item.memberCd;
        });

        return {
            memberCds: memberCds
        };
    }

    async getMemberList(pageSize: number, skip: number): Promise<Member[]> {
        return await this.memberRepository.find({
            order: {
                regDate: 'DESC'
            },
            skip: skip,
            take: pageSize
        });
    }

    async getMemberListCount(): Promise<number> {
        return await this.memberRepository.count();
    }

    async getMemberByCode(memberCd: number): Promise<Member | null> {
        return await this.memberRepository.findOne({
            where: { memberCd }
        });
    }

    async modifyMember(
        memberCd: number,
        modifyMemberDto: ModifyMemberDto
    ): Promise<UpdateResponse> {
        const modifyResult = await this.memberRepository.update(
            memberCd,
            modifyMemberDto
        );
        const { affected } = modifyResult;

        return {
            affected: affected,
            memberCd: memberCd
        };
    }

    async removeMember(memberCd: number): Promise<DeleteResponse> {
        const removeResult = await this.memberRepository.delete(memberCd);
        const { affected } = removeResult;

        return {
            affected: affected,
            memberCd: memberCd
        };
    }
}
