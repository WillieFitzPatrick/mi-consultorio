import { Component, Input, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTable, MatPaginator, MatSort } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { tableFilterDefinition } from '../models/swTables.models';

import { BehaviorSubject, of } from 'rxjs';
import { Observable, fromEvent, merge } from 'rxjs';
import { map, distinctUntilChanged, debounceTime, tap } from 'rxjs/operators';
// import {  } from 'rxjs/';
// import 'rxjs/add/observable/merge';
// import 'rxjs/add/observable/fromEvent';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/debounceTime';

import { SwTablesService } from '../services/sw-tables.service';

@Component({
   selector: 'sw-tables',
   templateUrl: './sw-tables.component.html',
   styleUrls: ['./sw-tables.component.scss'],
   providers: [SwTablesService],
})
export class SwTablesComponent implements OnInit {
   @Input() table: string;
   @Input() tableDescription: string;
   @Input() oFilter: tableFilterDefinition;

   _table: string;
   displayedColumns;
   exampleDatabase: ExampleDatabase;
   selection = new SelectionModel<number>(true, []);

   dataSource: ExampleDataSource | null;
   showForm: Boolean = false;
   rowData: any;
   formMode: string;
   tableDefinition;
   fields;
   isWaiting: Boolean = true;

   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
   @ViewChild('filter') filter: ElementRef;

   constructor(private dataService: SwTablesService,
      private router: Router,
      private location: Location,
      private media: MediaObserver,
      private cdr: ChangeDetectorRef) { }
   // swTypeOf(param: any){
   //    console.log(param);
   //    return typeof param;
   // }
   f_isLoadingData(){
     let _ret: boolean; 
      if ( typeof this.dataSource === 'undefined') {
         _ret = true;
      } else if (this.dataSource.isLoadingData) {
         _ret = true;
      } else {
         _ret = false;
      }
      //console.log( _ret );
      return _ret;
   }

   ngOnInit() {

      this._table = this.table;
      this.dataService.setTable(this.table);
      this.dataService.setTableFilter(this.oFilter);

      this.dataService.getSwTableDefinition()
                        //.do( () => {setTimeout(this.isWaiting = false,2000)} )
                        .subscribe(
                           res => {
                              this.tableDefinition = res;
                              this.exampleDatabase = new ExampleDatabase(this.dataService, this._table);

                              this.dataSource = new ExampleDataSource(this.exampleDatabase,
                                 this.paginator,
                                 this.sort,
                                 this._table,
                                 this.tableDefinition.searchcolumn);

                              this.displayedColumns = (this.media.isActive('xs')) ?
                                 this.tableDefinition.displayedColumnsXS :
                                 this.tableDefinition.displayedColumns;
                              
                              this.isWaiting = false
                           }
                        );

      fromEvent(this.filter.nativeElement, 'keyup').pipe(
         debounceTime(150),
         distinctUntilChanged())
         .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
         }
      );
      //this.isWaiting = false;
      
   }

   isAllSelected(): boolean {
      if (!this.dataSource) { return false; }
      if (this.selection.isEmpty()) { return false; }

      if (this.filter.nativeElement.value) {
         return this.selection.selected.length === this.dataSource.renderedData.length;
      } else {
         return this.selection.selected.length === this.exampleDatabase.data.length;
      }
   }

   masterToggle() {
      if (!this.dataSource) { return; }

      if (this.isAllSelected()) {
         this.selection.clear();
      } else if (this.filter.nativeElement.value) {
         this.dataSource.renderedData.forEach(data => this.selection.select(data.ID.toString()));
      } else {
         this.exampleDatabase.data.forEach(data => this.selection.select(data.ID.toString()));
      }
   }

   f_newForm() {
      this.formMode = 'new';
      this.rowData = [];
      this.showForm = !this.showForm;
   }

   f_editForm() {
      this.formMode = 'edit';
      this.isWaiting = true;

      if (this.selection.hasValue) {
         this.dataService.getSwTableRow(this._table, this.selection.selected[0]).pipe(
            tap(res => {
               this.rowData = res;
               this.showForm = !this.showForm;
               this.isWaiting = false;
            }))
            .subscribe();

      }
   }

   f_copyForm() {
      this.formMode = 'new';
      this.isWaiting = true;

      if (this.selection.hasValue) {
         this.dataService.getSwTableRow(this._table, this.selection.selected[0]).pipe(
            tap(res => {
               this.rowData = res;
               this.showForm = !this.showForm;
               this.isWaiting = false;
            }))
            .subscribe();

      }
   }

   f_closeForm() {
      // this.router.navigate(['config']);
      this.location.back();
   }

   f_guardar(data) {
      if (this.formMode === 'new') {
         this.dataService.saveNewData(this._table, data).pipe(
            tap(() => {
               this.showForm = false;
               this.dataService.getSwTableData(this._table).pipe(
                  map(res => { this.exampleDatabase.dataChange.next(res); }))
                  .subscribe();
            }))
            .subscribe();

      } else {
         if (this.selection.hasValue) {
            this.swDeepCopy(data, this.rowData);
            this.dataService.saveData(this._table, this.rowData, this.rowData.Id).pipe(
            tap(() => {
                  this.showForm = false;
                  this.dataService.getSwTableData(this._table).pipe(
                     map(res => { this.exampleDatabase.dataChange.next(res); }))
                     .subscribe();
            }))
            .subscribe();
         }
      }
   }

   swDeepCopy(origin, result) {
      // origin.foreach( prop => {
      //    const newValue = origin[prop];
      //    if (typeof newValue !== 'object') { // this also applies to arrays or null!
      //       if (typeof result[prop] !== 'object') {
      //          result[prop] = newValue;
      //       }
      //    } else {
      //       this.swDeepCopy(newValue, result[prop]);
      //    }
      // });

      // tslint:disable-next-line:forin
      for (const prop in origin) {
         const newValue = origin[prop];
         if (typeof newValue !== 'object') { // this also applies to arrays or null!
            if (typeof result[prop] !== 'object') {
               result[prop] = newValue;
            }
         } else {
            this.swDeepCopy(newValue, result[prop]);
         }
      }
   }

   f_cancelar() {
      this.showForm = false;
   }

   f_eliminar() {
      this.showForm = false;
      this.dataService.deleteData(this._table, this.rowData.Id).pipe(
         tap(() => {
            this.dataService.getSwTableData(this._table).pipe(
               map(res => { this.exampleDatabase.dataChange.next(res); }))
               .subscribe();
         }))
         .subscribe();
   }
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {

   /** Stream that emits whenever the data has been modified. */
   dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
   get data(): any[] { return this.dataChange.value; }

   constructor( private dataService: SwTablesService,
                private _table: string) {
      // Fill up the database form API.
      dataService.getSwTableData(this._table).pipe(
                 map(res => { this.dataChange.next(res); }))
                 .subscribe();
   }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
   _filterChange = new BehaviorSubject('');
   get filter(): string { return this._filterChange.value; }
   set filter(filter: string) { this._filterChange.next(filter); }
   filteredData: any[] = [];
   renderedData: any[] = [];
   public isLoadingData = true;

   constructor( private _exampleDatabase: ExampleDatabase,
                private _paginator: MatPaginator,
                private _sort: MatSort,
                private _table: string,
                private _searchcolumn: string) {
      
      super();
      this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
   }

   /** Connect function called by the table to retrieve one stream containing the data to render. */
   connect(): Observable<any[]> {
      setTimeout( () => this.isLoadingData = true);
      // Listen for any changes in the base data, sorting, filtering, or pagination
      const displayDataChanges = [
         this._exampleDatabase.dataChange,
         this._sort.sortChange,
         this._filterChange,
         this._paginator.page,
      ];
      if (this._exampleDatabase.data) {
         
         return merge(...displayDataChanges).pipe(map(() => {
            // Filter data
            this.filteredData = this._exampleDatabase.data.slice().filter((item: any) => {
               // let searchStr = (item[this._searchcolumn]).toLowerCase();
               const searchStr = (item['descrip']).toLowerCase();
               return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
            });

            // Sort filtered data
            const sortedData = this.sortData(this.filteredData.slice());

            // Grab the page's slice of the filtered sorted data.
            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
            setTimeout( () => this.isLoadingData = false,100);
            return this.renderedData;

         }));
      } else {
         setTimeout( () => this.isLoadingData = false,10);
         return of(this.renderedData);
      }
   }

   disconnect() { }

   /** Returns a sorted copy of the database data. */
   sortData(data: any[]): any[] {
      if (!this._sort.active || this._sort.direction === '') { return data; }

      return data.sort((a, b) => {
         let propertyA: number | string | boolean = '';
         let propertyB: number | string | boolean = '';

         switch (this._sort.active) {
            case 'Id':
               [propertyA, propertyB] = [a.Id, b.Id];
               break;
            case 'Descrip':
               [propertyA, propertyB] = [a.Descrip, b.Descrip];
               break;
            case 'Activo':
               [propertyA, propertyB] = [a.Alias, b.Alias];
               break;

         }
         const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
         const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

         return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
      });
   }
}


