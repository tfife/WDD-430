import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../item.model';

@Component({
  selector: 'invt-item-item',
  templateUrl: './item-item.component.html',
  styleUrls: ['./item-item.component.css']
})
export class ItemItemComponent implements OnInit {

  @Input() item: Item;
  statusColor: string;
  constructor() { }

  ngOnInit(): void {
    this.statusColor = this.getColor();
    
  }

  getColor() {
    switch (+this.item.status) {
      case 0: return "green";
      case 1: return "gold";
      case 2: return "red";
      default: return "black";
    }
  }

}