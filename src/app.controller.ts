import { Controller, Get, UseInterceptors, Param, Post, Body, UsePipes, UseFilters, HttpException } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggingInterceptor } from "./app.interceptor";
import { loginSchema } from "./login/schemas/login.schema";
import {JoiValidationPipe} from "./login/joi.validation.pipe";
import { AppValidationPipe } from "./app.validation.pipe";
import {HttpExceptionFilter} from "./http.exception.filter";


interface LoginDTO {
    username: string,
    password: string
}

@UseInterceptors(LoggingInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    if (Math.random() > 0.75) {
      throw new Error('something wrong');
    }
    return this.appService.getHello();
  }

  @Get('word/:word')
  getValidInfo(@Param('word', AppValidationPipe) word: string): string {
    return word;
  }
  

  @UsePipes(new JoiValidationPipe(loginSchema))
  @Post('/login')
  login(@Body() body: LoginDTO) {
    return body;
  }

  @Get('httpexception') 

  @UseFilters(new HttpExceptionFilter)
  getHttpException(): string {
    throw new HttpException('Oops', 401);

    return 'done';
  }
}
