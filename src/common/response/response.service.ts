import { Injectable } from '@nestjs/common';

const responseInfoList = {
    '0000': { message: 'Success' },
    '9901': { message: 'Not Found' },
    '9902': { message: 'Bad Request' },
    '9903': { message: 'Unauthorized' },
    '9904': { message: 'DB Execute Fail' },
    '9905': { message: 'Duplicated Request' },
    '9906': { message: 'API Request Fail' },
    '9907': { message: 'Decrypt Fail' },
    '9998': { message: 'Too Many Requests' },
    '9999': { message: 'Internal Server Error' }
};

export type TResponseInfo = {
    message: string;
};

export type TResponse = {
    body: {
        code: number;
        message: string;
        desc?: string;
        data?: object;
    };
};

export type TResponseOfPaging = {
    pagingInfo: {
        page: number;
        totalCount: number;
    };
    list: any[];
};

interface TypeOrmOperationResult {
    affected: number;
}
export interface UpdateResponse extends TypeOrmOperationResult {
    [primaryKeyName: string]: number; // ex) memberCd: number
}
export interface DeleteResponse extends TypeOrmOperationResult {
    [primaryKeyName: string]: number; // ex) memberCd: number
}
type TInsertResult = {
    [primaryKeysName: string]: Array<any>; // ex memberCds: []
};
export type InsertResponse = TInsertResult;

const makeResponseInfo = (code: number): TResponseInfo => {
    const responseInfoObj =
        responseInfoList[code.toString().padStart(4, '0')] || null;

    if (!responseInfoObj) {
        throw new Error('empty code:' + code);
    } else {
        return responseInfoObj;
    }
};

const Response = class {
    readonly body: {
        code: number;
        message: string;
        desc?: string;
        data?: object;
    };

    private responseInfoObj: TResponseInfo;

    constructor(code: number, data?: object, desc?: string) {
        this.responseInfoObj = makeResponseInfo(code);
        this.body = {
            code: code,
            message: this.responseInfoObj.message,
            desc: desc,
            data
        };
    }
};

@Injectable()
export class ResponseService {
    private responseInfoObj: TResponseInfo;
    private responseObj: TResponse;

    start(data?: object, code = 0, desc?: string): this {
        this.responseInfoObj = makeResponseInfo(code);
        this.responseObj = new Response(code, data, desc);
        return this;
    }

    get response() {
        return this.responseObj;
    }

    get responseBody() {
        return this.response.body;
    }
}
