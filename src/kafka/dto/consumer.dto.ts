import { IsArray, IsNotEmpty } from 'class-validator';

export class ConsumerDto {
    @IsNotEmpty()
    @IsArray()
    topics: [];
}
