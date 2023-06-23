import { Module } from '@nestjs/common';
import { CommonCodeService } from './common-code.service';
import { CommonCodeController } from './common-code.controller';
import { CommonCodeMain } from './entities/common-code-main.entity';
import { CommonCodeSub } from './entities/common-code-sub.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommonCodeMain,
      CommonCodeSub
    ])
  ],
  controllers: [CommonCodeController],
  providers: [
    CommonCodeService,
  ]
})
export class CommonCodeModule {}
