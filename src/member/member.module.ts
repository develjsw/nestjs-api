import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { ResponseService } from '../common/response/response.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Member
    ])
  ],
  controllers: [MemberController],
  providers: [
      MemberService,
      ResponseService
  ]
})
export class MemberModule {}
