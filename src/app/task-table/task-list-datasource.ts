import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { TaskI } from '../../TaskI';

// TODO: Replace this with your own data model type
export interface TaskTableItem {
  name: string;
  id: number;
}

export interface TaskTableItem1 {
    name: string;
    id: number;
    status: string;
  }

const EXAMPLE_DATA_1: TaskTableItem1[] = [
    {id: 1, name: 'Hydrogen',status:'yes'},
    {id: 2, name: 'Helium',status:'yes'},
    {id: 3, name: 'Lithium',status:'yes'},
    {id: 4, name: 'Beryllium',status:'yes'},
    {id: 5, name: 'Boron',status:'yes'},
    {id: 6, name: 'Carbon',status:'yes'},
    {id: 7, name: 'Nitrogen',status:'yes'},
    {id: 8, name: 'Oxygen',status:'yes'},
    {id: 9, name: 'Fluorine',status:'yes'},
    {id: 10, name: 'Neon',status:'yes'},
    {id: 11, name: 'Sodium',status:'yes'},
    {id: 12, name: 'Magnesium',status:'yes'},
    {id: 13, name: 'Aluminum',status:'yes'},
    {id: 14, name: 'Silicon',status:'yes'},
    {id: 15, name: 'Phosphorus',status:'yes'},
    {id: 16, name: 'Sulfur',status:'yes'},
    {id: 17, name: 'Chlorine',status:'yes'},
    {id: 18, name: 'Argon',status:'yes'},
    {id: 19, name: 'Potassium',status:'yes'},
    {id: 20, name: 'Calcium',status:'yes'},
  ];

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TaskTableItem[] = [
  {id: 1, name: 'Hydrogen'},
  {id: 2, name: 'Helium'},
  {id: 3, name: 'Lithium'},
  {id: 4, name: 'Beryllium'},
  {id: 5, name: 'Boron'},
  {id: 6, name: 'Carbon'},
  {id: 7, name: 'Nitrogen'},
  {id: 8, name: 'Oxygen'},
  {id: 9, name: 'Fluorine'},
  {id: 10, name: 'Neon'},
  {id: 11, name: 'Sodium'},
  {id: 12, name: 'Magnesium'},
  {id: 13, name: 'Aluminum'},
  {id: 14, name: 'Silicon'},
  {id: 15, name: 'Phosphorus'},
  {id: 16, name: 'Sulfur'},
  {id: 17, name: 'Chlorine'},
  {id: 18, name: 'Argon'},
  {id: 19, name: 'Potassium'},
  {id: 20, name: 'Calcium'},
];

/**
 * Data source for the TaskTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TaskTableDataSource extends DataSource<TaskTableItem1> {
  data: TaskTableItem1[] = EXAMPLE_DATA_1;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TaskTableItem1[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TaskTableItem1[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TaskTableItem1[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'status': return compare(+a.status, +b.status, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
