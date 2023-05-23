import { Column, Entity, PrimaryColumn } from 'typeorm';

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

    // TODO : ENUM으로 변경 예정
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
}