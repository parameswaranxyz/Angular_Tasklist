import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../Task';
import { TaskListService } from '../task-list.service';
import { Router, NavigationExtras } from "@angular/router";
import { Data } from "../data";
import { TaskI} from '../../TaskI';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { AddTaskComponent } from '../add-task/add-task.component';
import { UpdateTaskComponent } from '../update-task/update-task.component';
import { FormComponent } from '../form/form.component';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})

export class ListComponent implements OnInit {

  displayedColumns:string[] = ['Id', 'description', 'priority','weight', 'dependant','schedule','create','edit','control'];
  
  taskToEdit:Task;
  sortedData:TaskI[];
  pageSize:number = 5;
  status_class:string = "fail";
  status:string;
 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private taskService:TaskListService,private router: Router,private dataStore: Data,private dialog:MatDialog) {}

  // get the data and convert it as table with paginator and sorting option
  
  getList(){

      this.taskService.getTaskList().subscribe(data => {
        if(data){
          this.dataSource = new MatTableDataSource<TaskI>(data['list']);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;      
          this.sortedData = data['list'].slice();
          console.log("Datasource",this.sortedData);
        }
        else{
          console.log("Error in response");
        }
    });
  }

  // promise
  // getList(){
  //   this.taskService.getTaskList().then( 
  //     data => {
  //           this.dataSource = new MatTableDataSource<TaskI>(data['list']);
  //           this.dataSource.sort = this.sort;
  //           this.dataSource.paginator = this.paginator;      
  //           this.sortedData = data['list'].slice();
  //           console.log("Datasource",this.sortedData);
  //         },
  //     err => console.log(err),
  //     () => console.log("Success")
  //   );
  // }
  
  sortData(sort: Sort) {
    const data = this.sortedData.slice();
    this.dataSource = new MatTableDataSource<TaskI>(data);
    this.pageindex = 0
    this.dataSource.paginator = this.paginator;   

    
    if (!sort.active || sort.direction === '') {
      this.dataSource = data;
      return;
    }
  
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a.Task_id, b.Task_id, isAsc);
        case 'des': return compare(a.Task_des, b.Task_des, isAsc);
        case 'priority': return compare(a.Task_priority, b.Task_priority, isAsc);
        case 'weight': return compare(a.Task_weight, b.Task_weight, isAsc);
        case 'dependant': return compare(a.Task_dependant, b.Task_dependant, isAsc);
        case 'schedule': return compare(a.Task_schedule, b.Task_schedule, isAsc);
        case 'time': return compare(a.Task_created_on, b.Task_created_on, isAsc);
        default: return 0;
      }
    });
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSelect(editTask){
    console.log("EditObject: ",editTask);
    this.taskToEdit = editTask;
    this.dataStore.setData({
      "messageTask": this.taskToEdit;
  });
  }

  deleteMe(id){
    this.taskService.deleteTask(id).subscribe( data => {
      if(data){
          this.deleteMessage = data['status'];
          this.getList();
        }
      else{
        this.deleteMessage = data['status'];
      }
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(FormComponent, {
      width:'30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result:",result);
      if(result="success")
        this.getList();
    });
  }

  openUpdateDialog(editTask){
    console.log("EditObject: ",editTask);
    this.taskToEdit = editTask;
    this.dataStore.storage = {
          "messageTask": this.taskToEdit;
      };

    const dialogRef = this.dialog.open(FormComponent, {
      width:'30%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result:",result);
      if(result="success")
        this.getList();
    });
  }

  ngOnInit(){
    this.getList();
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}