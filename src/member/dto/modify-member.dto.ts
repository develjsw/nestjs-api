import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class ModifyMemberDto {
    @IsOptional()
    @IsString()
    memberName: string;

    @IsOptional()
    @IsString()
    nickName: string;

    @IsOptional()
    @IsString()
    @Length(13, 13)
    tel: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;

    modDate: Date;
}
