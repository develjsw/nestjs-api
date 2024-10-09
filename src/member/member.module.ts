import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { ResponseService } from '../common/response/response.service';
import { MemberService } from './member.service';
import { MemberRepository } from './repositories/member.repository';
import { MemberSubscribe } from './entities/mysql/member.subscribe';

@Module({
    imports: [],
    controllers: [MemberController],
    providers: [ResponseService, MemberService, MemberRepository, MemberSubscribe]
})
export class MemberModule {}
