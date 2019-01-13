import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( it => {
      let contains = false;
      if(it.title && it.title.toLowerCase().includes(searchText)){
        contains = true;
      } else if (it.name && it.name.toLowerCase().includes(searchText)){
        contains = true;      
       }
      return contains;
    });
   }
}