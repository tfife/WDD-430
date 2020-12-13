import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items: Item[] = [];
  maxItemId: number;

  @Output() itemListChangedEvent = new Subject<Item[]>();

  constructor(private http: HttpClient) {
      this.getItems();
  }

   sortAndSend() {
    this.maxItemId = this.getMaxId();
    this.items.sort((a, b) => {
      //first sort by status
      if (+a.status > +b.status) {
        return -1;
      }
      if (+a.status < +b.status) {
        return 1;
      }
      //then sort by name
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      //if still even, it doesn't matter
      return 0;
    })
    this.itemListChangedEvent.next(this.items.slice());
   }

   getItems() {
    this.http.get('http://localhost:3000/items').subscribe(
      //success method
      (items: any) => {
        this.items = items.items;
        this.sortAndSend();
      },
      //error method
      (error: any) => {
        console.log(error);
      });
    }

   getItem(id: string) {
     for (let item of this.items) {
       if (item.id === id) {
         return item
       }
     }
     return null;
   }

   getMaxId(): number {
    let maxId: number = 0;
    for (let item of this.items) {
      let currentId: number = +item.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }


  addItem(item: Item) {
    if (!item) {
      return;
    }

    // make sure id of the new Item is empty
    item.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, item: Item }>('http://localhost:3000/items',
      item,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new item to items
          this.items.push(responseData.item);
          this.sortAndSend();
        }
      );
  }

  updateItem(originalItem: Item, newItem: Item) {
    if (!originalItem || !newItem) {
      return;
    }

    const pos = this.items.findIndex(d => d.id === originalItem.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Item to the id of the old Item
    newItem.id = originalItem.id;
    newItem._id = originalItem._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/items/' + originalItem.id,
      newItem, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.items[pos] = newItem;
          this.sortAndSend();
        }
      );
  }

  deleteItem(item: Item) {

    if (!item) {
      return;
    }

    const pos = this.items.findIndex(d => d.id === item.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/items/' + item.id)
      .subscribe(
        (response: Response) => {
          this.items.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }
}