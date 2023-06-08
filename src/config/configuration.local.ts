export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000, // .env 파일의 PORT 값을 가져오되 10진수로 변환해서 가져옴, 디폴트 값 = 3000
    database: {
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_SCHEMA,
        entities: ['dist/**/entities/*.entity{.ts,.js}'], // entity 인식
        synchronize: false,
        logging: 'all'
    },
    slack: {
        url: 'https://hooks.slack.com/services/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'
    }
})