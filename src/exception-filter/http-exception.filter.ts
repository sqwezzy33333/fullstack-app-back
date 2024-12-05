import {ExceptionFilter, Catch, ArgumentsHost, HttpException} from '@nestjs/common';
import {Request, Response} from 'express';
import {ValidationError} from "./models";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        let status = exception.getStatus();
        const exceptionResponse = exception.getResponse();
        let additionalMessage: ValidationError[] = [];
        if (typeof exceptionResponse === 'object') {
            console.log(exceptionResponse);
            const errorMessage = exceptionResponse['message'] as string[];
            if (status === 400) {
                additionalMessage = this.mapValidateError(errorMessage);
            }
        }

        let exceptionMessage = exception.message;

        if (!(exception instanceof HttpException)) {
            status = 500;
            exceptionMessage = 'internal server error';
        }

        const responsePayload = {
            message: exceptionMessage,
            statusCode: status,
            additional: additionalMessage,
        };

        response
            .status(status)
            .json(responsePayload);
    }

    mapValidateError(messages: string[]): ValidationError[] {
        return messages.map((message) => {
            const splitter = '|';

            const toSplit = message.split(splitter);
            return {
                field: message.includes(splitter) ? toSplit[0] : null,
                message: toSplit[1] || message,
            }
        })
    }
}
