import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateMemberDto {
    @IsNotEmpty()
    @IsString()
    memberNm: string;

    @IsOptional()
    @IsString()
    nickName: string;

    @IsNotEmpty()
    @IsString()
    @Length(13,13)
    tel: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;

    regDate: Date;
}
