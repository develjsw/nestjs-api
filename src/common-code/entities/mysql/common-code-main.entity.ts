import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CommonCodeSub } from './common-code-sub.entity';

@Entity('tb_common_code_main') // 실제 테이블명 (MySQL은 대소문자 상관X)
export class CommonCodeMain {
    @PrimaryColumn('varchar', {
        name: 'main_cd' // 실제 컬럼명 (MySQL은 대소문자 상관X)
    })
    mainCd: string; // 사용 할 변수명

    @Column('varchar', {
        name: 'main_nm'
    })
    mainNm: string;

    @Column('varchar', {
        name: 'is_use'
    })
    isUse: string;

    @Column({
        type: 'datetime',
        name: 'reg_date',
        nullable: true
    })
    regDate?: Date;

    @Column({
        type: 'datetime',
        name: 'mod_date',
        nullable: true
    })
    modDate?: Date;

    @Column({
        type: 'datetime',
        name: 'del_date',
        nullable: true
    })
    delDate?: Date;

    @OneToMany(() => CommonCodeSub, (sub) => sub.commonCodeMain)
    commonCodeSubs: CommonCodeSub[];
}
