import { Injectable } from '@nestjs/common';
import { GoodsRepository } from '../repositories/goods.repository';
import { Goods } from '../entities/mysql/goods.entity';
import { ManagerException } from '../../common/exception/manager-exception';

@Injectable()
export class GoodsService {
    constructor(private readonly goodsRepository: GoodsRepository) {}

    async findGoodsAll(): Promise<Goods[]> {
        const goodsAll = await this.goodsRepository.findGoodsAll();

        if (!goodsAll.length) throw new ManagerException(9902, 'Not Found - Goods');

        return goodsAll;
    }
}
