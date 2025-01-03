import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

type TTestStatus = 'A' | 'B';

export class TestDto {
    @IsOptional()
    @IsNumber()
    memberId: number;

    @IsOptional()
    @IsString()
    memberName: string;

    @IsOptional()
    @IsString()
    nickName: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    tel: string;

    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    @IsIn(['A', 'B'], { message: 'Type mismatch' })
    memberStatus: TTestStatus;
}

export class TestDateDto {
    @IsOptional()
    regDate: Date;

    @IsOptional()
    modDate: Date;

    @IsOptional()
    delDate: Date;

    @IsOptional()
    dropDate: Date;
}
