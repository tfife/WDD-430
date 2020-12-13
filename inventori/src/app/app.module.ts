import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { ItemItemComponent } from './items/item-item/item-item.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ItemsComponent } from './items/items.component';
import { ItemsFilterPipe } from './items/items-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ItemsListComponent,
    ItemItemComponent,
    ItemEditComponent,
    ItemDetailComponent,
    ItemsComponent,
    ItemsFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
