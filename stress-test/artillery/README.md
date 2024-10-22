### Artillery
- 공식 문서 : https://www.artillery.io/docs

---

1. `Stress Test(부하 테스트) 도구`
   - API의 성능 및 처리량을 측정하는 데 사용되는 도구


2. `글로벌 설치 필요`
   - `$ npm install -g artillery` 명령어로 글로벌 설치 필요


3. `Windows - PowerShell/Bash Shell 사용하여 실행`
   - Artillery는 Windows의 PowerShell 또는 Bash shell에서 모두 실행 가능하지만, PowerShell의 실행 정책에 주의해야 함
   - Windows에서는 실행 정책을 RemoteSigned로 변경하거나 Bash Shell을 사용할 수 있음


4. `실제 API 호출 주의`
   - 부하 테스트는 실제로 API에 요청을 보내기 때문에 운영 중인 서비스에 부하를 줄 수 있음
   - 개발/테스트 환경에서 먼저 실행하거나, 트래픽 제한을 적용하여 주의 깊게 실행할 필요가 있음
 

5. `처리량(성능)은 Server Spec에 크게 의존`
   - 처리량은 서버의 CPU, 메모리, 네트워크 대역폭과 같은 하드웨어 리소스에 크게 의존함
   - 애플리케이션의 최적화 상태 또한 성능에 중요한 영향을 미침

---

6. 명령어 실행 방법
   - 명령어로 실행이 가능하나 세부적인 명령들을 사용하기 위해서 `파일명.yml`을 생성하고
해당 파일 위치에서 `$ artillery run 파일명.yml` 명령어 실행을 통해 테스트 진행

    ~~~
    EX) artillery run 파일명.yml
    
    config:
    target: 'http://localhost:3000'     # 테스트할 NestJS API 서버의 URL
    phases:
    - duration: 60                      # 테스트 지속 시간 (s)
    arrivalRate: 1000                   # 초당 1000개의 새로운 요청을 보냄
    scenarios:
    - name: '[Stress Test]'
      flow:
        - get:
          url: '/health'                # 테스트할 endpoint
    ~~~