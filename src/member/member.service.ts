import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InsertResult, Repository } from 'typeorm';
import { Member, memberStatus } from './entities/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DBException } from '../common/exception/db-exception/db-exception';
import { plainToClass } from 'class-transformer';

// TODO : converting 관련 부분 분리 예정
type MemberType = {
  memberCd: number;
  memberNm: string;
  nickName: string;
  tel: string;
  email: string;
  status: memberStatus;
  regDate: string;
  modDate: string;
  delDate: string;
  dropDate: string;
}

// TODO : scope 생성 예정
@Injectable()
export class MemberService {

  constructor(
      @InjectRepository(Member)
      private readonly memberRepository: Repository<Member>
  ) {
  }

  // TODO : return type 규칙 생성하여 적용 예정
  async createMember(
      createMemberDto: CreateMemberDto
  ): Promise<any> {

    try {
      let status, message;
      const memberDto = plainToClass(CreateMemberDto, createMemberDto);
      memberDto.regDate = new Date();

      const result = await this.memberRepository
          .createQueryBuilder()
          .insert()
          .into(Member)
          .values(memberDto)
          .execute();

      if (result.raw.affectedRows) {
        status = 201;
        message = 'success'
      } else {
        status = 200;
        message = 'success'
      }

      return {
        status: status,
        message: message
      }
    } catch (error) {
      throw new DBException(error);
    }

  }

  findAll() {
    return `This action returns all member`;
  }

  async findMemberByMemberCd(
      memberCd: number
  ): Promise<Member> {

    const selectResult = await this.memberRepository
        .createQueryBuilder('mem')
        .select('mem.*')
        .where('mem.memberCd = :memberCd', { memberCd })
        .execute();

    // TODO : 함수화하여 분리 예정
    return selectResult.map((member): MemberType => {
      return {
        memberCd: member.member_cd,
        memberNm: member.member_nm,
        nickName: member.nick_name,
        tel: member.tel,
        email: member.email,
        status: member.status,
        regDate: member.reg_date,
        modDate: member.mod_date,
        delDate: member.del_date,
        dropDate: member.drop_date
      }
    });

  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
