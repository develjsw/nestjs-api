import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

export enum memberStatus {
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
        type: 'datetime',
        name: 'REG_DATE',
        nullable: true
    })
    regDate?: Date;

    @UpdateDateColumn({
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

    @Column({
        type: 'datetime',
        name: 'DROP_DATE',
        nullable: true
    })
    dropDate?: Date;
}
