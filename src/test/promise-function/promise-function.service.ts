import { Injectable } from '@nestjs/common';

@Injectable()
export class PromiseFunctionService {
    /*
        [ Promise 함수(all, allSettled, any, race) 공통 사항 ]
        - 비동기적으로 동시에 실행되도록 구현되어 있음
        - 매개변수는 일반 값과 Promise가 혼합된 배열일 수 있음 (단, 내부적으로 일반 값은 Promise.resolve(값)으로 처리됨)
          EX) [ Promise.resolve(1), new Promise((resolve, reject)), "문자열", 42 ]
        - 예시와 같은 형태가 아니라면 map 함수를 사용해 일반 값을 Promise로 변환 후 처리할 수 있음
          EX) 입력값.map((item) => Promise.resolve(item))
    */

    // Promise 함수의 매개변수에 적합한 기본 포맷 케이스
    async findMembersWithDefaultPromiseFormat(): Promise<Promise<{ name: string; age: number }[]>[]> {
        return [
            new Promise((resolve) =>
                resolve([
                    { name: '회원1', age: 10 },
                    { name: '회원10', age: 15 }
                ])
            ),
            new Promise((resolve, reject) => reject('데이터가 존재하지 않습니다.')),
            new Promise((resolve) =>
                resolve([
                    { name: '회원3', age: 30 },
                    { name: '회원30', age: 35 }
                ])
            ),
            new Promise((resolve) =>
                resolve([
                    { name: '회원4', age: 40 },
                    { name: '회원40', age: 45 }
                ])
            ),
            new Promise((resolve, reject) => reject('에러가 발생했습니다. 잠시후 다시 시도해주세요.'))
        ];
    }

    // 실제 다른 API를 여러번 호출해서 가져온 데이터 포맷 케이스
    async findMembersWithArrayObjectPromiseFormat(): Promise<{ members: Promise<{ name: string; age: number }[]> }[]> {
        return [
            {
                members: new Promise((resolve) =>
                    resolve([
                        { name: '회원1', age: 10 },
                        { name: '회원10', age: 15 }
                    ])
                )
            },
            { members: new Promise((resolve, reject) => reject('데이터가 존재하지 않습니다.')) },
            {
                members: new Promise((resolve) =>
                    resolve([
                        { name: '회원3', age: 30 },
                        { name: '회원30', age: 35 }
                    ])
                )
            },
            {
                members: new Promise((resolve) =>
                    resolve([
                        { name: '회원4', age: 40 },
                        { name: '회원40', age: 45 }
                    ])
                )
            },
            { members: new Promise((resolve, reject) => reject('에러가 발생했습니다. 잠시후 다시 시도해주세요.')) }
        ];
    }

    async promiseFunctionAll(): Promise<void> {
        console.log('[ Promise.all - 기본 포맷 ]');
        const members1 = await this.findMembersWithDefaultPromiseFormat();
        console.log(members1);

        await Promise.all(members1)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });

        console.log('--------------------------------------------');

        console.log('[ Promise.all - 배열 객체 포맷 (가공 필요) ]');
        await Promise.all(
            await this.findMembersWithArrayObjectPromiseFormat().then((result) => {
                console.log(result);

                return result.map((items) => {
                    const { members } = items;
                    return members;
                });
            })
            /*.catch((error) => {
                // findMembersWithArrayObjectPromiseFormat함수 호출 부분에서는 catch로 예외를 잡지 못함
                // then ~ catch는 [{ Promise }, { Promise } ] 배열 객체에서 findMembersWithArrayObjectPromiseFormat() 함수 전체에 대한 Promise 상태를 처리함
                // 이 함수 자체는 성공(resolve)한 배열을 반환하므로, catch는 호출되지 않음
                // 대신, 배열 내부의 members 필드 각각의 Promise는 개별적으로 처리되므로, 배열 내부 Promise의 reject 상태는 여기서 잡히지 않음
                console.log(error);
                return error;
            })*/
        ).catch((error) => {
            // Promise.all은 배열의 모든 Promise가 성공(resolve)해야만 결과를 반환함
            // 배열 중 하나라도 reject되면 즉시 Promise.all 자체가 reject 상태가 되며, 이후 catch 블록으로 전달됨
            // 배열 내부의 모든 Promise를 개별적으로 처리하려면 Promise.allSettled를 사용하는 것이 적합함
            console.log(error);
        });
    }

    async promiseFunctionAllSettled() {
        console.log('[ Promise.allSettled - 기본 포맷 ]');
        const members1 = await this.findMembersWithDefaultPromiseFormat();
        console.log(members1);

        await Promise.allSettled(members1)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });

        console.log('--------------------------------------------');

        console.log('[ Promise.all - 배열 객체 포맷 (가공 필요) ]');
        await Promise.allSettled(
            await this.findMembersWithArrayObjectPromiseFormat().then((result) => {
                console.log(result);

                return result.map((items) => {
                    const { members } = items;
                    return members;
                });
            })
            /*.catch((error) => {
                // findMembersWithArrayObjectPromiseFormat함수 호출 부분에서는 catch로 예외를 잡지 못함
                // then ~ catch는 [{ Promise }, { Promise } ] 배열 객체에서 findMembersWithArrayObjectPromiseFormat() 함수 전체에 대한 Promise 상태를 처리함
                // 이 함수 자체는 성공(resolve)한 배열을 반환하므로, catch는 호출되지 않음
                // 대신, 배열 내부의 members 필드 각각의 Promise는 개별적으로 처리되므로, 배열 내부 Promise의 reject 상태는 여기서 잡히지 않음
                console.log(error);
                return error;
            })*/
        ); /*.catch((error) => {
            // Promise.allSettled는 배열 내 모든 Promise의 상태(fulfilled 또는 rejected)를 반환하며, 절대 reject 상태로 끝나지 않음
            // 각 Promise의 결과를 상태별로 처리할 수 있으므로, 외부 catch는 필요하지 않음
            // 실패한 Promise의 이유는 결과 배열의 rejected 상태로 확인 가능
            console.log(error);
        });*/
    }
}
