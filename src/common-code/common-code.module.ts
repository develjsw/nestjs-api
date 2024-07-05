import { Module } from '@nestjs/common';
import { CommonCodeService } from './common-code.service';
import { CommonCodeController } from './common-code.controller';
import { CommonCodeMain } from './entities/mysql/common-code-main.entity';
import { CommonCodeSub } from './entities/mysql/common-code-sub.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseService } from '../common/response/response.service';
import { CommonCodeMainRepository } from './repositories/common-code-main.repository';
import { CommonCodeSubRepository } from './repositories/common-code-sub.repository';

@Module({
    imports: [TypeOrmModule.forFeature([CommonCodeMain, CommonCodeSub])],
    controllers: [CommonCodeController],
    providers: [
        ResponseService,
        CommonCodeService,
        CommonCodeMainRepository,
        CommonCodeSubRepository
    ]
})
export class CommonCodeModule {}
