import { Column, Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { CommonCodeMain } from './common-code-main.entity';

@Entity('TB_COMMON_CODE_SUB')
export class CommonCodeSub {
    @PrimaryColumn('varchar', {
        name: 'MAIN_CD'
    })
    mainCd: string;

    @PrimaryColumn('varchar', {
        name: 'SUB_CD'
    })
    subCd: string;

    @Column('varchar', {
        name: 'SUB_NM'
    })
    subNm: string;

    @Column('varchar', {
        name: 'CODE_DESC'
    })
    codeDesc: string;

    @Column('int', {
        name: 'SORT_NO'
    })
    sortNo: number;

    @Column('varchar', {
        name: 'IS_USE'
    })
    isUse: string;

    @Column({
        name: 'REG_DATE'
    })
    regDate?: Date;

    @Column({
        name: 'MOD_DATE'
    })
    modDate?: Date;

    @Column({
        name: 'DEL_DATE'
    })
    delDate?: Date;

    @ManyToOne(() => CommonCodeMain, (main) => main.commonCodeSubs)
    @JoinColumn({
        name: 'MAIN_CD'
    })
    commonCodeMain: CommonCodeMain;
}
