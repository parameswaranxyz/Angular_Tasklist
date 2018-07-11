import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { TaskI } from '../../TaskI';
import { TaskListService } from '../task-list.service';

const TASKLIST: TaskI[] = [];

export class TaskTableDataSource extends DataSource<TaskI> {
  data: TaskI[] = [];
  private taskService:TaskListService;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  getList(){
    this.taskService.getTaskList().subscribe( response => this.data = response['list']);
    console.log("This new table"+this.data); 
  }
  
  connect(): Observable<TaskI[]> {
    const dataMutations = [ observableOf(this.data),this.paginator.page, this.sort.sortChange ];

    this.getList();

    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  disconnect() {}

  private getPagedData(data: TaskI[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: TaskI[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'Task_id': return compare(a.Task_id, b.Task_id, isAsc);
        case 'Task_des': return compare(a.Task_des, b.Task_des, isAsc);
        case 'Task_priority': return compare(+a.Task_priority, +b.Task_priority, isAsc);
        case 'Task_weight': return compare(+a.Task_weight, +b.Task_weight, isAsc);
        case 'Task_dependant': return compare(+a.Task_dependant, +b.Task_dependant, isAsc);
        case 'Task_schedule': return compare(+a.Task_weight, +b.Task_weight, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
