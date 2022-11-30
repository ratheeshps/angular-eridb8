import { Component, OnInit, Input } from '@angular/core';
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: 'app-m-table',
  templateUrl: './m-table.component.html',
  styleUrls: ['./m-table.component.css']
})
export class MTableComponent implements OnInit {
  filterQuery: string;
  filterQueryChanged: Subject<string> = new Subject<string>();

  @Input() data;
  @Input() settings;

  dataCopy = [];
  pageOfItems: Array<any>;
  siteName = '';
  headers = [];
  direction = false;
  sortHeader = '';

  constructor() {
    this.filterQueryChanged.pipe(debounceTime(2000), distinctUntilChanged()).subscribe(query => {
      this.filterQuery = query;

      this.dataCopy = JSON.parse(JSON.stringify(this.data));

      for(let key in this.settings.columns) {
        if(this.settings.columns[key]['filter'] && this.settings.columns[key]['filter'] != '') {
          this.dataCopy = this.dataCopy.filter(a => a[key].toLowerCase().includes(this.settings.columns[key]['filter'].toLowerCase()));
        }
      }

    });
  }

  ngOnInit(): void {}

  ngOnChanges() {
    this.dataCopy = JSON.parse(JSON.stringify(this.data));
    this.headers = Object.keys(this.settings.columns);
  }

  filterChangeEvent(search, column) {

    this.filterQueryChanged.next(search);

  }

  compareValues(direction: any, a: any, b: any) {
    if (a < b) {
      return -1 * direction;
    }
    if (a > b) {
      return direction;
    }
    return 0;
  }

  sort(header: string) {
    console.log('sort called');
    if(this.sortHeader === header) {
      this.direction = !this.direction;
    } else {
      this.direction = false;
    }

    this.sortHeader = header;


    const dir: number = this.direction ? 1 : -1;

    const compare: Function = this.compareValues;

    console.log(this.sortHeader, dir, header);

    let dataCopy = this.dataCopy.sort((a, b) => {
      return compare.call(null, dir, a[header], b[header]);
    });

    this.dataCopy = JSON.parse(JSON.stringify(dataCopy));

    console.log(this.dataCopy);
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }
}
