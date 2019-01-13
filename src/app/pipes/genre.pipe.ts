import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
let genres = [];
@Pipe({name: 'photoFormat'})
export class PhotoMoviePipe implements PipeTransform {
  transform(array: any[], type: string): any {
    let newArray =  array.filter(value => {
      for (let i = 0;i < genres.length; i++){
        if(value === genres[i].id){
          return 
        }
      }
    });
    return newArray;
  }
}