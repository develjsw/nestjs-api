import {
    IsNotEmpty,
    IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ListMemberDto {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number) // postman에서 호출 할 경우에 queryParams에 type을 선언할 수 없기에 형변환 사용 (입력 값 유효성 검증에서만 형변환 시키는 것으로 실제 값이 형변환 되지는 않음)
    page: number;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    pageSize: number;
}