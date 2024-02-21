/*
[ 인터페이스 ]
- 상속 받는 곳에서 implements 키워드를 통해 받는다.
- 인터페이스에서는 별도의 구현을 하지 않고 함수명 반환 타입 정도만 명시한다.
- 인터페이스에서 선언되어 있지 않은 함수를 생성하는 것은 불가능하다.
*/
export interface PersonInterface {
    getPersonInfo(key: number): Promise<TPersonInfo>;
}

export interface TPersonInfo {
    name: string;
    age?: number;
    jobType: TJob;
    workArea?: TDeveloper | TDesigner;
}

export type TJob = 'developer' | 'designer' | 'lawyer' | 'doctor';
export type TDeveloper = 'Back-End' | 'Front-End';
export type TDesigner = '시각디자인' | '패키지디자인' | '공예디자인';
