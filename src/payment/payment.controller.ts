import { Controller } from '@nestjs/common';
import { ResponseService } from '../common/response/response.service';

@Controller('payments')
export class PaymentController {
    constructor(private readonly responseService: ResponseService) {}
}
