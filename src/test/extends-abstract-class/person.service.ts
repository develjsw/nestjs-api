import { JobService } from './job.service';

// 추상 클래스 상속
export class PersonService extends JobService {
    // 구현부 - 매개변수 타입 조건 로직 추가
    async getJobInfoOfEachPerson(
        jobType: TWebJob | string,
        contents: object
    ): Promise<{ jobType: string }> {
        if (!['web-developer', 'web-planner'].includes(jobType)) {
            jobType = 'unknown';
            contents = {};
        }
        return await super.getJobInfo(jobType, contents);
    }
}

type TWebJob = 'web-developer' | 'web-planner';
