import { Member } from '../member/entities/mysql/member.entity';

type TGenericEntity<T, K extends keyof T> = {
    [key in K]: T[key];
};

export type CreateMemberDto = TGenericEntity<Member, 'memberNm' | 'nickName' | 'tel' | 'email' | 'regDate'>;
