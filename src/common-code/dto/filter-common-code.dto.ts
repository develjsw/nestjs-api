import { IsOptional, IsString, Length } from 'class-validator';

export class FilterCommonCodeDto {
    @IsOptional()
    @IsString()
    @Length(2, 3)
    mainCd: string;

    @IsOptional()
    @IsString()
    @Length(2, 3)
    subCd: string;
}
