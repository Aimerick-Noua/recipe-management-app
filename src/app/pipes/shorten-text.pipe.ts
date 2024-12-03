import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenText',
})
export class ShortenTextPipe implements PipeTransform {

  transform(value:string,arg:boolean): string {

    if(arg) return value+' ... less';
    return value.substring(0,70).concat(' ... more');
  }

}
