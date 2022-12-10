import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                timestamp: new Date().toISOString(),
                status: 'fail',
                Code: status,
                data: exception.message
            });
    }
}



/*
{
    "timestamp":"2022-12-10T16:05:35.731Z",
    "status":"fail","Code":500,
    "data":{
        "response":{
            "statusCode":500,
            "message":"Internal Server Error"
        },
        "status":500,
        "options":{},
        "message":"Internal Server Error",
        "name":"InternalServerErrorException"
    }
}
*/