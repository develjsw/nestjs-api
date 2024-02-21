/*
import { EMemberStatus } from '../entities/member.entity';
import * as moment from 'moment';

export type TMember = {
    memberCd: number;
    memberNm: string;
    nickName: string;
    tel: string;
    email: string;
    status: EMemberStatus;
    regDate: string;
    modDate: string;
    delDate: string;
    dropDate: string;
};

export function convertMemberList(list: []): TMember[] {
    return list.map((raw: any) => {
        return {
            memberCd: raw.member_cd,
            memberNm: raw.member_nm,
            nickName: raw.nick_name,
            tel: raw.tel,
            email: raw.email,
            status: raw.status,
            regDate: raw.reg_date
                ? moment(raw.reg_date).format('YYYY-MM-DD HH:mm:ss')
                : null,
            modDate: raw.mod_date
                ? moment(raw.mod_date).format('YYYY-MM-DD HH:mm:ss')
                : null,
            delDate: raw.del_date
                ? moment(raw.del_date).format('YYYY-MM-DD HH:mm:ss')
                : null,
            dropDate: raw.drop_date
                ? moment(raw.drop_date).format('YYYY-MM-DD HH:mm:ss')
                : null
        };
    });
}

export function convertMember(raw): TMember {
    return {
        memberCd: raw.member_cd,
        memberNm: raw.member_nm,
        nickName: raw.nick_name,
        tel: raw.tel,
        email: raw.email,
        status: raw.status,
        regDate: raw.reg_date
            ? moment(raw.reg_date).format('YYYY-MM-DD HH:mm:ss')
            : null,
        modDate: raw.mod_date
            ? moment(raw.mod_date).format('YYYY-MM-DD HH:mm:ss')
            : null,
        delDate: raw.del_date
            ? moment(raw.del_date).format('YYYY-MM-DD HH:mm:ss')
            : null,
        dropDate: raw.drop_date
            ? moment(raw.drop_date).format('YYYY-MM-DD HH:mm:ss')
            : null
    };
}
*/
