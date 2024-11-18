import { Injectable } from '@nestjs/common';
import { Payment } from '../entities/mysql/payment.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PaymentRepository {
    private paymentRepository: Repository<Payment>;

    constructor(private readonly dataSource: DataSource) {
        this.paymentRepository = dataSource.getRepository(Payment);
    }
}
