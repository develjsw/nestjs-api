import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.shouldValidate(metatype)) {
            return value;
        }

        const object = plainToInstance(metatype, value);
        const errors = await validate(object);

        if (errors.length > 0) {
            const errorMessages = this.extractErrorMessages(errors);
            throw new BadRequestException(errorMessages);
        }

        return value;
    }

    private shouldValidate(metatype: any): boolean {
        const noValidationNeeded: Function[] = [String, Boolean, Number, Array, Object];
        return !noValidationNeeded.includes(metatype);
    }

    private extractErrorMessages(errors: ValidationError[]): string[] {
        return errors.flatMap((error) => Object.values(error.constraints || {}));
    }
}
