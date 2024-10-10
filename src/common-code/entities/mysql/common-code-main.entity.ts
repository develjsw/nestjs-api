import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CommonCodeSub } from './common-code-sub.entity';

@Entity('TB_COMMON_CODE_MAIN') // 실제 테이블명
export class CommonCodeMain {
    @PrimaryColumn('varchar', {
        name: 'MAIN_CD' // 실제 컬럼명
    })
    mainCd: string; // 사용 할 변수명

    @Column('varchar', {
        name: 'MAIN_NM'
    })
    mainNm: string;

    @Column('varchar', {
        name: 'IS_USE'
    })
    isUse: string;

    @Column({
        type: 'datetime',
        name: 'REG_DATE',
        nullable: true
    })
    regDate?: Date;

    @Column({
        type: 'datetime',
        name: 'MOD_DATE',
        nullable: true
    })
    modDate?: Date;

    @Column({
        type: 'datetime',
        name: 'DEL_DATE',
        nullable: true
    })
    delDate?: Date;

    @OneToMany(() => CommonCodeSub, (sub) => sub.commonCodeMain)
    commonCodeSubs: CommonCodeSub[];
}
