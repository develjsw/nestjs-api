import { Column, Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { CommonCodeMain } from './common-code-main.entity';

@Entity('tb_common_code_sub')
export class CommonCodeSub {
    @PrimaryColumn('varchar', {
        name: 'main_cd'
    })
    mainCd: string;

    @PrimaryColumn('varchar', {
        name: 'sub_cd'
    })
    subCd: string;

    @Column('varchar', {
        name: 'sub_nm'
    })
    subNm: string;

    @Column('varchar', {
        name: 'code_desc'
    })
    codeDesc: string;

    @Column('int', {
        name: 'sort_no'
    })
    sortNo: number;

    @Column('varchar', {
        name: 'is_use'
    })
    isUse: string;

    @Column('datetime', {
        name: 'reg_date'
    })
    regDate?: Date;

    @Column('datetime', {
        name: 'mod_date'
    })
    modDate?: Date;

    @Column('datetime', {
        name: 'del_date'
    })
    delDate?: Date;

    @ManyToOne(() => CommonCodeMain, (main) => main.commonCodeSubs)
    @JoinColumn({
        name: 'MAIN_CD'
    })
    commonCodeMain: CommonCodeMain;
}
