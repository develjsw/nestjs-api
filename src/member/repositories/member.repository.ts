import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Member } from '../entities/mysql/member.entity';
import { CreateMemberDto } from '../dto/create-member.dto';
import { ModifyMemberDto } from '../dto/modify-member.dto';
import { DeleteResponse, InsertResponse, UpdateResponse } from '../../common/response/response.service';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { InsertResult } from 'typeorm/query-builder/result/InsertResult';

@Injectable()
export class MemberRepository {
    private memberRepository: Repository<Member>;

    constructor(private readonly dataSource: DataSource) {
        this.memberRepository = dataSource.getRepository(Member);
    }

    async createMember(createMemberDto: CreateMemberDto): Promise<InsertResponse> {
        const result: InsertResult = await this.memberRepository.insert(createMemberDto);
        const { identifiers: memberCdList } = result;
        const memberCds = memberCdList.map((item) => item.memberCd);

        return {
            memberCds
        };
    }

    async getMemberList(page_size: number, skip: number): Promise<Member[]> {
        return await this.memberRepository.find({
            order: {
                regDate: 'DESC'
            },
            skip: skip,
            take: page_size
        });
    }

    async getMemberListCount(): Promise<number> {
        return await this.memberRepository.count();
    }

    async getMemberByCode(memberCd: number): Promise<Member | null> {
        return await this.memberRepository.findOne({
            where: { memberCd } // (= memberCd: memberCd) 객체 리터럴에서 속성 이름과 변수의 이름이 동일한 경우 이를 축약할 수 있는 속성명 축약이 적용됨.
        });
    }

    async modifyMember(memberCd: number, modifyMemberDto: ModifyMemberDto): Promise<UpdateResponse> {
        const modifyResult: UpdateResult = await this.memberRepository.update(memberCd, modifyMemberDto);
        const { affected } = modifyResult;

        return {
            affected: affected,
            memberCd: memberCd
        };
    }

    async removeMember(memberCd: number): Promise<DeleteResponse> {
        const removeResult: DeleteResult = await this.memberRepository.delete(memberCd);
        const { affected } = removeResult;

        return {
            affected: affected,
            memberCd: memberCd
        };
    }
}
