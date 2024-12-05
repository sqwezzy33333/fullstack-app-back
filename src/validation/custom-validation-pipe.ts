import {Injectable, ValidationPipe} from "@nestjs/common";
import {ValidatorOptions} from "@nestjs/common/interfaces/external/validator-options.interface";

@Injectable()
export class CustomValidationPipe extends ValidationPipe {

    async validate(object: object, validatorOptions?: ValidatorOptions) {
        return super.validate(object, {stopAtFirstError: true});
    }
}
