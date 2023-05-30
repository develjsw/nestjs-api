import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

enum memberStatus {
    A = '활성화',
    D = '탈퇴'
}

@Entity('TB_MEMBER')
export class Member {
    @PrimaryGeneratedColumn({
        name: 'MEMBER_CD'
    })
    memberCd: number;

    @Column('varchar', {
        name: 'MEMBER_NM'
    })
    memberNm: string;

    @Column('varchar', {
        name: 'NICK_NAME'
    })
    nickName: string;

    @Column('varchar', {
        name: 'TEL'
    })
    tel: string;

    @Column('varchar', {
        name: 'EMAIL'
    })
    email: string;

    @Column('varchar', {
        name: 'STATUS'
    })
    status: memberStatus;

    @CreateDateColumn({
        name: 'REG_DATE'
    })
    regDate: Date;

    @UpdateDateColumn({
        name: 'MOD_DATE'
    })
    modDate: Date;

    @Column({
        name: 'DEL_DATE'
    })
    delDate: Date;

    @Column({
        name: 'DROP_DATE'
    })
    dropDate: Date;
}
