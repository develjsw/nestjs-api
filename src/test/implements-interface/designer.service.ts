import { PersonInterface, TJob, TPersonInfo } from './person.interface';

// 인터페이스 상속
export class DesignerService implements PersonInterface {
    // 임의의 데이터
    async getDesignerInfo() {
        return {
            name: '김디자이너',
            jobType: 'designer'
        };
    }

    // 구현부
    async getPersonInfo(): Promise<TPersonInfo> {
        const memberInfo = await this.getDesignerInfo();
        return {
            name: memberInfo.name,
            jobType: <TJob>memberInfo.jobType // 타입 단언(방법2)으로 타입 명시 (안적는 경우 에러 발생)
        };
    }
}
