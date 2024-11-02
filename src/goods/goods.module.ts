import { Module } from '@nestjs/common';
import { GoodsController } from './goods.controller';
import { GoodsService } from './servicies/goods.service';
import { ResponseService } from '../common/response/response.service';
import { GoodsRepository } from './repositories/goods.repository';

@Module({
    imports: [],
    controllers: [GoodsController],
    providers: [ResponseService, GoodsRepository, GoodsService],
    exports: []
})
export class GoodsModule {}
