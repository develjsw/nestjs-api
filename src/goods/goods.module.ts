import { Module } from '@nestjs/common';
import { GoodsController } from './goods.controller';
import { GoodsService } from './servicies/goods.service';

@Module({
    imports: [],
    controllers: [GoodsController],
    providers: [GoodsService],
    exports: []
})
export class GoodsModule {}
