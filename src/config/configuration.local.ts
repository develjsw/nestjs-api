// export default () => ({
//     port: parseInt(process.env.PORT, 10) || 3000, // .env 파일의 PORT 값을 가져오되 10진수로 변환해서 가져옴, 디폴트 값 = 3000
//     database: {
//         dbMysql: {
//             type: 'mysql',
//             host: process.env.DATABASE_HOST,
//             port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
//             username: process.env.DATABASE_USERNAME,
//             password: process.env.DATABASE_PASSWORD,
//             database: process.env.DATABASE_SCHEMA,
//             entities: ['dist/**/entities/mysql/*.entity{.ts,.js}'], // entity 인식
//             subscribers: ['dist/**/entities/mysql/*.subscriber{.ts,.js}'], // subscribe 인식
//             // subscribers: [
//             //     __dirname + '/../**/entities/mysql/*.subscriber{.ts,.js}'
//             // ],
//             synchronize: false,
//             logging: 'all'
//         },
//         redis: {
//             host: process.env.REDIS_HOST,
//             port: parseInt(process.env.REDIS_PORT),
//             defaultTTL: 60 // 유지 시간
//         }
//     },
//     slack: {
//         url: process.env.SLACK_WEBHOOK_URL
//     },
//     throttler: {
//         ttl: 1000,
//         limit: 5
//     },
//     bitly: {
//         api: {
//             accessToken: process.env.BITLY_SHORT_URL_ACCESS_TOKEN,
//             url: process.env.BITLY_SHORT_URL_API
//         }
//     }
// });
