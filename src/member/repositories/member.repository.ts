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
        const { identifiers: memberIdList } = result;
        const memberIds = memberIdList.map((item) => item.memberId);

        return {
            memberIds
        };
    }

    async findMemberListWithPaging(pageSize: number, skip: number): Promise<Member[]> {
        return await this.memberRepository.find({
            order: {
                regDate: 'DESC'
            },
            skip,
            take: pageSize
        });
    }

    async findMemberListCount(): Promise<number> {
        return await this.memberRepository.count();
    }

    async findMemberById(memberId: number): Promise<Member | null> {
        return await this.memberRepository.findOne({
            where: { memberId } // (= memberId: memberId) 객체 리터럴에서 속성 이름과 변수의 이름이 동일한 경우 이를 축약할 수 있는 속성명 축약이 적용됨.
        });
    }

    async updateMemberById(memberId: number, dto: ModifyMemberDto): Promise<UpdateResponse> {
        const updateResult: UpdateResult = await this.memberRepository.update(memberId, dto);
        const { affected } = updateResult;

        if (!affected) {
            throw new DBException('DB Exception - Member Unchanged or failed');
        }

        return {
            memberId
        };
    }

    async deleteMemberById(memberId: number): Promise<DeleteResponse> {
        const deleteResult: DeleteResult = await this.memberRepository.delete(memberId);
        const { affected } = deleteResult;

        if (!affected) {
            throw new DBException('DB Exception - Member Undeleted or failed');
        }

        return {
            memberId
        };
    }
}
