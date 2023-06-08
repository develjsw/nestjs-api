import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InsertResult, Repository } from 'typeorm';
import { Member, memberStatus } from './entities/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DBException } from '../common/exception/db-exception/db-exception';
import { plainToClass } from 'class-transformer';
import { ListMemberDto } from './dto/list-member.dto';

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

  // TODO : 반환 형식 추가 및 공통화 필요
  async getMemberList(
      listMemberDto: ListMemberDto
  ): Promise<{
    pagingInfo: {
      page: number,
      totalCount: number
    }, data: MemberType[]
  }> {
    let page = Number(listMemberDto.page);
    let pageSize = Number(listMemberDto.pageSize);

    const skip = (page - 1) * pageSize;

    const rawDataList = await this.memberRepository
        .createQueryBuilder('mem')
        .select('mem.*')
        .skip(skip)
        .take(pageSize)
        .execute();

    // TODO : 함수화하여 분리 예정
    const data = rawDataList.map((member) => {
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

    const totalCount = await this.memberRepository
        .createQueryBuilder('mem')
        .getCount();

    return { pagingInfo: { page, totalCount }, data };
  }

  async findMemberByMemberCd(
      memberCd: number
  ): Promise<{
    data
  }> {

    const rawData = await this.memberRepository
        .createQueryBuilder('mem')
        .select('mem.*')
        .where('mem.memberCd = :memberCd', { memberCd })
        .execute();

    // TODO : 함수화하여 분리 예정
    const data = rawData.map((member): MemberType => {
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

    return { data }

  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
