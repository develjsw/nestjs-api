import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ResponseService } from '../common/response/response.service';
import { GoodsService } from './servicies/goods.service';
import { Goods } from './entities/mysql/goods.entity';

@Controller('goods')
export class GoodsController {
    constructor(private readonly responseService: ResponseService, private readonly goodsService: GoodsService) {}

    @Get()
    async getGoodsAll() {
        const result: Goods[] = await this.goodsService.findGoodsAll();

        return this.responseService.start(result).responseBody;
    }

    @Get(':id')
    async getGoodsById(@Param('id', ParseIntPipe) id: number) {
        const result = await this.goodsService.findGoodsById(id);

        return this.responseService.start(result).responseBody;
    }
}
