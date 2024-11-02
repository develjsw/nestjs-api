import { Controller, Get } from '@nestjs/common';
import { ResponseService } from '../common/response/response.service';
import { GoodsService } from './servicies/goods.service';

@Controller('goods')
export class GoodsController {
    constructor(private readonly responseService: ResponseService, private readonly goodsService: GoodsService) {}

    @Get()
    async getGoodsAll() {
        const result = await this.goodsService.findGoodsAll();

        return this.responseService.start(result).responseBody;
    }
}
