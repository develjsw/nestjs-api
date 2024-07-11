export type TCommonCodeGroup = {
    [mainCd: string]: TCommonCode;
};

export type TCommonCode = {
    mainCd: string;
    mainNm: string;
    subCd: string;
    subNm: string;
    codeDesc?: string;
    sortNo: number;
};
