import {
    EMemberStatus
} from '../entities/member.entity';

export type TMember = {
    memberCd: number;
    memberNm: string;
    nickName: string;
    tel: string;
    email: string;
    status: EMemberStatus;
    regDate: string,
    modDate: string,
    delDate: string,
    dropDate: string
}

export function convertMemberList(list: []): TMember[] {
    return list.map((raw: any) => {
        return {
            memberCd: raw.member_cd,
            memberNm: raw.member_nm,
            nickName: raw.nick_name,
            tel: raw.tel,
            email: raw.email,
            status: raw.status,
            /* TODO : date format 변경 예정 */
            regDate: raw.reg_date,
            modDate: raw.mod_date,
            delDate: raw.del_date,
            dropDate: raw.drop_date
        }
    })
}

export function convertMember(raw): TMember {
    return {
        memberCd: raw.member_cd,
        memberNm: raw.member_nm,
        nickName: raw.nick_name,
        tel: raw.tel,
        email: raw.email,
        status: raw.status,
        /* TODO : date format 변경 예정 */
        regDate: raw.reg_date,
        modDate: raw.mod_date,
        delDate: raw.del_date,
        dropDate: raw.drop_date
    }
}