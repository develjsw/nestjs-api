import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_goods')
export class Goods {
    @PrimaryGeneratedColumn({
        name: 'goods_id'
    })
    goodsId: number;

    @Column('varchar', {
        name: 'goods_name'
    })
    goodsName: string;

    @Column('int', {
        name: 'goods_price'
    })
    goodsPrice: number;

    @Column('char', {
        name: 'goods_is_use'
    })
    goodsIsUse: string;

    @Column('datetime', {
        name: 'reg_date'
    })
    regDate: Date;

    @Column('datetime', {
        name: 'mod_date'
    })
    modDate: Date;

    @Column('datetime', {
        name: 'del_date'
    })
    delDate: Date;
}
