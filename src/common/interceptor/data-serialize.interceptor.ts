import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import * as moment from 'moment';

export class DataSerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data: any) => {
                // data - undefined, null, 빈 값인 경우 예외 처리
                if (data === undefined || data === null) {
                    return data;
                }

                // BigInt와 DateTime 직렬화 후 JSON 변환
                return JSON.parse(serializeBigIntAndDateTime(data));
            })
        );
    }
}

function serializeBigIntAndDateTime(obj: any): string {
    return JSON.stringify(obj, (key: string, value: any) => {
        // BigInt 처리: BigInt 값을 숫자로 변환
        if (typeof value === 'bigint') {
            return Number(value);
        }

        // 날짜 포맷 처리: ISO 8601 형식의 문자열을 'YYYY-MM-DD HH:mm:ss'로 변환
        if (typeof value === 'string' && isValidDate(value)) {
            return moment(value).format('YYYY-MM-DD HH:mm:ss');
        }

        return value;
    });
}

function isValidDate(value: string): boolean {
    // 유효한 ISO 8601 날짜 형식인지 확인
    return moment(value, moment.ISO_8601, true).isValid();
}
