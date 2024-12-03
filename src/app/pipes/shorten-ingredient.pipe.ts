import { Pipe, PipeTransform } from "@angular/core";

@Pipe(
    {name: 'shortenIngredient'}
)
export class ShortenIngredientPipe implements PipeTransform {

  transform(value: any): any {
   
    return value.length > 5 ? value.slice(0, 5).sort((a:any,b:any)=>a.length-b.length).concat('...')  : value;
    
    // return value.length > 5 ? value.slice(0, 5) + '...' : value;
  }

}