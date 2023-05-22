export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000, // .env 파일의 PORT 값을 가져오되 10진수로 변환해서 가져옴, 디폴트 값 = 3000
    // TODO : 설정 값 추가 예정
})