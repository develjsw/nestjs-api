import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { ResponseService } from '../common/response/response.service';
import { PaymentService } from './servicies/payment.service';
import { PaymentRepository } from './repositories/payment.repository';

@Module({
    imports: [],
    controllers: [PaymentController],
    providers: [ResponseService, PaymentService, PaymentRepository],
    exports: []
})
export class PaymentModule {}
