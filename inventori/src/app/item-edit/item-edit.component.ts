import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Item } from '../items/item.model';
import { ItemService } from '../items/item.service';

@Component({
  selector: 'invt-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {

  originalItem: Item;
  item: Item;
  editMode: boolean = false;
  id: string;
  
  constructor(
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe (
      (params: Params) => {
        if (!params.id) {
          this.editMode = false;
          return;
        } else {
          this.originalItem = this.itemService.getItem(params.id);
          if (!this.originalItem) {
            return
          }
          this.editMode = true;
          this.item = JSON.parse(JSON.stringify(this.originalItem));
        }
      }
    )
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newItem: Item = new Item("", value.name, value.description, value.status, null);
    if(this.editMode) {
      this.itemService.updateItem(this.originalItem, newItem)
    } else {
      this.itemService.addItem(newItem);
    }
    this.router.navigate(['/items']);
  }

  onCancel() {
    this.router.navigate(['/items']);    
  }

  onDelete() {
    if (!this.editMode) {
      return;
    }
    this.itemService.deleteItem(this.originalItem);
    this.router.navigate(['/items']);
  }

}
