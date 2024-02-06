import { Injectable } from '@nestjs/common';
import axios from 'axios'

@Injectable()
export class ShortUrlService {
    private shortUrlApi: string
    private accessToken: string

    init(): this {
        this.shortUrlApi = process.env.BITLY_SHORT_URL_API
        this.accessToken = process.env.BITLY_SHORT_URL_ACCESS_TOKEN
        return this
    }

    getAccessToken(): string {
        return this.accessToken
    }

  async makeShortUrl(originUrl: string): Promise<any> {
      const params = {
          long_url: originUrl,
      }

      return await axios
          .post(this.shortUrlApi, params, {
              headers: {
                  Authorization: 'Bearer ' + this.accessToken,
                  'Content-type': 'application/json',
              },
          })
          .then((res) => {
              return res.hasOwnProperty('data') ? res.data : {}
          })
          .catch((error) => {
              console.log(error)
              throw new Error('단축 URL 생성 실패')
          })
  }
}