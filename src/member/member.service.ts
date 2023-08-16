import { Inject, Injectable, Scope } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { ModifyMemberDto } from './dto/modify-member.dto';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DBException } from '../common/exception/db-exception/db-exception';
import { plainToClass } from 'class-transformer';
import { ListMemberDto } from './dto/list-member.dto';
import { SlackService } from '../common/slack/slack.service';
import { TResponseOfPaging } from '../common/response/response.service';
import {
  TMember,
  convertMemberList,
  convertMember
} from './type/member-type';

@Injectable({ scope: Scope.REQUEST })
export class MemberService {

  private readonly nowDate;

  @Inject(SlackService)
  private readonly slackService: SlackService

  constructor(
      @InjectRepository(Member)
      private readonly memberRepository: Repository<Member>
  ) {
    this.nowDate = new Date();
  }

  async createMember(
      createMemberDto: CreateMemberDto
  ): Promise<void> {
    try {
      const memberDto = plainToClass(CreateMemberDto, createMemberDto);
        memberDto.regDate = this.nowDate;

      await this.memberRepository
        .createQueryBuilder()
        .insert()
        .into(Member)
        .values(memberDto)
        .execute();

    } catch (error) {
      await this.slackService.send(`회원 생성 도중 에러 발생! - ${error}`);
      throw new DBException(error);
    }
  }

  async getMemberList(
      listMemberDto: ListMemberDto
  ): Promise<TResponseOfPaging> {
    let page = Number(listMemberDto.page);
    let pageSize = Number(listMemberDto.pageSize);
    const skip = (page - 1) * pageSize;
    let list: TMember[];

    const totalCount = await this.memberRepository
        .createQueryBuilder('mem')
        .getCount();

    const rawDataList = await this.memberRepository
        .createQueryBuilder('mem')
        .select('mem.*')
        .skip(skip)
        .take(pageSize)
        .execute();

    list = convertMemberList(rawDataList);

    return { pagingInfo: { page, totalCount }, list };
  }

  async findMemberByMemberCd(
      memberCd: number
  ): Promise<TMember> {
    let data: TMember;

    const rawData = await this.memberRepository
        .createQueryBuilder('mem')
        .select('mem.*')
        .where('mem.memberCd = :memberCd', { memberCd })
        .execute();

    const [result] = rawData;

    data = (result)
      ? convertMember(result)
      : rawData;

    return data;
  }

  async modifyMember(
      memberCd: number,
      modifyMemberDto: ModifyMemberDto
  ): Promise<any> {
    try {
      const memberDto = plainToClass(ModifyMemberDto, modifyMemberDto);
        memberDto.modDate = this.nowDate;

      await this.memberRepository
          .createQueryBuilder()
          .update()
          .set(memberDto)
          .where('memberCd = :memberCd',{ memberCd })
          .execute();

    } catch (error) {
      await this.slackService.send(`회원 수정 도중 에러 발생! - ${error}`);
      throw new DBException(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
