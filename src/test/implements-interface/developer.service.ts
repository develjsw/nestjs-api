import { PersonInterface, TDeveloper, TJob, TPersonInfo } from './person.interface';

// 인터페이스 상속
export class DeveloperService implements PersonInterface {
    // 임의의 데이터
    async getDeveloperInfo() {
        return {
            name: '김개발',
            jobType: 'developer',
            workArea: 'Back-End'
        };
    }

    // 구현부
    async getPersonInfo(): Promise<TPersonInfo> {
        const memberInfo = await this.getDeveloperInfo();
        return {
            name: memberInfo.name,
            /*
                유니온 타입으로 선언해둔 경우 아래와 같이 타입스크립트에서 '타입 추론'을 하지 못해 에러가 발생하는 경우가 생긴다.
                이때, 아래와 같이 '타입 단언'이라는 문법을 통해 에러를 무시할 수 있겠으나 런타임 에러를 발생시킬 수도 있기 때문에 최대한 지양해야 한다.
                '타입 단언' 대신 '타입 가드'를 사용해서 막을 수도 있는데 조건문을 이용해 타입 범위를 좁히는 기능이며 키워드는 다음과 같다.
                [ typeof, instanceof, in ]
                하지만 TJob과 TDeveloper의 경우 인스턴스나 객체가 아니며 typeof로 정확한 타입을 판별하기 어렵기에 타입 단언을 사용할 수 밖에 없다.
            */
            jobType: memberInfo.jobType as TJob, // 타입 단언(방법1)으로 타입 명시 (안적는 경우 에러 발생)
            workArea: <TDeveloper>memberInfo.workArea // 타입 단언(방법2)으로 타입 명시 (안적는 경우 에러 발생)
        };
    }
}
