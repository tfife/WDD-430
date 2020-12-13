import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from '../item.model';
import { ItemService } from '../item.service';

@Component({
  selector: 'invt-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {
  items: Item[];
  private subscription: Subscription;
  term: string;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.getItems();
      
    this.subscription = this.itemService.itemListChangedEvent
    .subscribe(
      (itemList: Item[]) => {
        this.items = itemList;
      }
    )
  }

  search(value: string) {
    this.term = value;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
