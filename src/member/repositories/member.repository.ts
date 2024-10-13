import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Member } from '../entities/mysql/member.entity';
import { CreateMemberDto } from '../dto/create-member.dto';
import { ModifyMemberDto } from '../dto/modify-member.dto';
import { DeleteResponse, InsertResponse, UpdateResponse } from '../../common/response/response.service';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { InsertResult } from 'typeorm/query-builder/result/InsertResult';
import { DBException } from '../../common/exception/db-exception';

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

    async getMembersWithPaging(pageSize: number, skip: number): Promise<Member[]> {
        return await this.memberRepository.find({
            order: {
                regDate: 'DESC'
            },
            skip,
            take: pageSize
        });
    }

    async getCountMembers(): Promise<number> {
        return await this.memberRepository.count();
    }

    async getMemberByCode(memberCd: number): Promise<Member | null> {
        return await this.memberRepository.findOne({
            where: { memberCd } // (= memberCd: memberCd) 객체 리터럴에서 속성 이름과 변수의 이름이 동일한 경우 이를 축약할 수 있는 속성명 축약이 적용됨.
        });
    }

    async updateMemberById(memberCd: number, dto: ModifyMemberDto): Promise<UpdateResponse> {
        const updateResult: UpdateResult = await this.memberRepository.update(memberCd, dto);
        const { affected } = updateResult;

        if (!affected) {
            throw new DBException('DB Exception - Member Unchanged or failed');
        }

        return {
            memberCd
        };
    }

    async deleteMemberById(memberCd: number): Promise<DeleteResponse> {
        const deleteResult: DeleteResult = await this.memberRepository.delete(memberCd);
        const { affected } = deleteResult;

        if (!affected) {
            throw new DBException('DB Exception - Member Undeleted or failed');
        }

        return {
            memberCd
        };
    }
}
