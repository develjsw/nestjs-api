import { Module } from '@nestjs/common';
import { CommonCodeService } from './common-code.service';
import { CommonCodeController } from './common-code.controller';
import { ResponseService } from '../common/response/response.service';
import { CommonCodeMainRepository } from './repositories/common-code-main.repository';
import { CommonModule } from '../common/common.module';

@Module({
    imports: [CommonModule],
    controllers: [CommonCodeController],
    providers: [ResponseService, CommonCodeService, CommonCodeMainRepository]
})
export class CommonCodeModule {}
