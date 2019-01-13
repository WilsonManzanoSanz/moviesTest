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
@Pipe({name: 'photoFormat'})
export class PhotoMoviePipe implements PipeTransform {
  transform(value: any, type: string): any {
    let newValue =  'https://image.tmdb.org/t/p/w500' + value;
    return newValue;
  }
}