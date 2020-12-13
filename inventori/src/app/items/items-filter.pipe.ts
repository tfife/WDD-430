import { Pipe, PipeTransform } from '@angular/core';
import { Item } from './item.model';

@Pipe({
  name: 'itemsFilter'
})
export class ItemsFilterPipe implements PipeTransform {

  transform(items: Item[], term: string): any {
    let filteredArray: Item[] = [];
    if (term && term.length > 0) {
      filteredArray = items.filter(
        (item: Item) => item.name.toLowerCase().includes(term.toLowerCase()) || (item.description && item.description.toLowerCase().includes(term.toLowerCase()))
      );
    }
    if (filteredArray.length < 1) {
      return items;
    }
    return filteredArray;
  }

}
