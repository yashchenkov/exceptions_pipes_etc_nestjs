import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class AppValidationPipe implements PipeTransform {
  transform(word: any, metadata: ArgumentMetadata) {
    console.log(word)
    if(word === 'word'){
      return true
    } else {
      return false
    }
  }
}
