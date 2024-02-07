import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Member } from '../entities/member.entity';
import { CreateMemberDto } from '../dto/create-member.dto';

@Injectable()
export class MemberRepository {
    private memberRepository: Repository<Member>

    constructor(private readonly dataSource: DataSource) {
        this.memberRepository = dataSource.getRepository(Member)
    }

    async createMember(createMemberDto: CreateMemberDto): Promise<CreateMemberDto> {
        return await this.memberRepository.save(createMemberDto)
    }

    async getMemberList(pageSize: number, skip: number): Promise<Array<Member>> {
        return await this.memberRepository.find({
            skip: skip,
            take: pageSize
        })
    }

    async getMemberListCount(): Promise<number> {
        return await this.memberRepository.count()
    }

    async getMemberByCode(memberCd: number): Promise<Member | null> {
        return await this.memberRepository.findOne({
            where: { memberCd }
        })
    }
}