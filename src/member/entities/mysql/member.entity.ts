import { AfterUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum EMemberStatus {
    A = '활성화',
    D = '탈퇴'
}

@Entity('tb_member')
export class Member {
    @PrimaryGeneratedColumn({
        name: 'member_id'
    })
    memberId: number;

    @Column('varchar', {
        name: 'member_name'
    })
    memberName: string;

    @Column('varchar', {
        name: 'nick_name'
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
        name: 'member_status'
    })
    memberStatus: EMemberStatus;

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

    @AfterUpdate()
    executeConsoleLog() {
        console.log('Member 엔티티 수정될 때마다 콘솔 로그 남기기');
    }
}
