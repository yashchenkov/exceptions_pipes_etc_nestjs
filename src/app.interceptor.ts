import {
    CallHandler,
    Injectable,
    NestInterceptor,
    ExecutionContext,
    InternalServerErrorException
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';



@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('New request!');
        const now = Date.now();
        console.log(next.handle());
        return next
            .handle()
            .pipe(
                map((data) => ({
                    status: "success",
                    data: data
                })),
                catchError(err => {
                    console.log(`\nExecution time: ${Date.now() - now}ms`);
                    console.log('\nRequest was failed!');
                    console.log('\nError message: ', err);
                    return throwError(() => new InternalServerErrorException());
                   }
                )
            )
            
    }

}