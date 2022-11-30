import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { MTableComponent } from './m-table/m-table.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, MTableComponent, PaginationComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }