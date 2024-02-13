import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Member } from '../entities/member.entity';
import { CreateMemberDto } from '../dto/create-member.dto';
import { ModifyMemberDto } from '../dto/modify-member.dto';
import {
    DeleteResponse,
    InsertResponse,
    UpdateResponse
} from '../../common/response/response.service';

@Injectable()
export class MemberRepository {
    private memberRepository: Repository<Member>

    constructor(private readonly dataSource: DataSource) {
        this.memberRepository = dataSource.getRepository(Member)
    }

    async createMember(createMemberDto: CreateMemberDto): Promise<InsertResponse> {
        /*
        const dto = [
            {
                memberNm: '테스트이름1',
                nickName: '테스트닉네임1',
                tel: '010-1111-1111',
                email: 'test1@gmail.com'
            },
            {
                memberNm: '테스트이름2',
                nickName: '테스트닉네임2',
                tel: '010-2222-2222',
                email: 'test2@gmail.com'
            },
        ]
        */

        //const result = await this.memberRepository.insert(dto);
        const result = await this.memberRepository.insert(createMemberDto);
        const { identifiers: memberCdList } = result;
        const memberCds = memberCdList.map((item) => {
            return item.memberCd
        });

        return {
            memberCds: memberCds,
        }
    }

    async getMemberList(pageSize: number, skip: number): Promise<Array<Member>> {
        return await this.memberRepository.find({
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
        })
    }

    async modifyMember(memberCd: number, modifyMemberDto: ModifyMemberDto): Promise<UpdateResponse> {
        const modifyResult = await this.memberRepository.update(memberCd, modifyMemberDto);
        const { affected } = modifyResult;

        return {
            affected: affected,
            memberCd: memberCd
        }
    }

    async removeMember(memberCd: number): Promise<DeleteResponse> {
        const removeResult = await this.memberRepository.delete(memberCd);
        const { affected } = removeResult;

        return {
            affected: affected,
            memberCd: memberCd
        }
    }
}