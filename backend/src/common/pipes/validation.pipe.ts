import { Injectable, PipeTransform , ArgumentMetadata, BadRequestException} from "@nestjs/common";
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {

    async transform(value: any, {metatype}: ArgumentMetadata) {
        // If metatype is null or is a native JS object return the value
        if (!metatype || this.toValidate(metatype)){
            return value;
        }
        // Convert the object to the class and validates it
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        console.log(errors)
        // If there is some error throws an exception, returns value otherwise
        if (errors.length > 0) {
          throw new BadRequestException('Validation failed');
        }
        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
    
}