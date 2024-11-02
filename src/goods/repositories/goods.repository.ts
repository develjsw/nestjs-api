import { Injectable } from '@nestjs/common';
import { Goods } from '../entities/mysql/goods.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class GoodsRepository {
    private readonly goodsRepository: Repository<Goods>;

    constructor(private readonly dataSource: DataSource) {
        this.goodsRepository = dataSource.getRepository(Goods);
    }

    async findGoodsAll(): Promise<Goods[]> {
        return await this.goodsRepository.find();
    }
}
