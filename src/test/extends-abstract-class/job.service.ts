/*
[ 추상 클래스 ]
- 상속 받는 곳에서 extends 키워드를 통해 받는다.
- 추상 클래스에서는 함수명, 매개변수, 반환타입 등을 정의할 수 있다. (너무 많은 것을 정의하기 보다는 공통으로 사용될 핵심 부분만 정의 후 구현부에서 로직 작성)
- 추상 클래스에서 정의한 함수를 상속받는 곳에서 사용할 때 함수명, 매개변수, 반환타입을 변경해서 사용할 수는 없다. (단, union 타입으로 추가는 가능하며, any로 정의되어 있다면 원하는 타입으로 설정 가능하다.)
- 추상 클래스 내에 정의되어 있지 않은 함수를 상속받는 곳에서 생성할 수 있다.
*/
export abstract class JobService {
    async getJobInfo(jobType: string, contents: object) {
        const jobTypeObj = { jobType: jobType };
        return { ...jobTypeObj, ...contents };
    }
}
