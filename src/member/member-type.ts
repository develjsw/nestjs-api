import { memberStatus } from './entities/member.entity';

export type MemberType = {
    memberCd: number;
    memberNm: string;
    nickName: string;
    tel: string;
    email: string;
    status: memberStatus;
    regDate: string;
    modDate: string;
    delDate: string;
    dropDate: string;
}