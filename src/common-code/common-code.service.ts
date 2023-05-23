import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonCodeService {

  findAll() {
    return `This action returns all `;
  }

  findOne(id: number) {
    return `This action returns a #${id} `;
  }

}
