import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
// import { TaskTableDataSource } from './task-list-dataSource';
import { TaskTableDataSource } from './task-list-dataSource';
import { TaskListService } from '../task-list.service';
import {TaskI} from "../../TaskI";


@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})

export class TaskTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  taskList:TaskI[] = [] 

  dataSource: TaskTableDataSource;

  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  // displayedColumns = ['Id','des','priority','weight','dependant','schedule'];
  displayedColumns = ['id','name','status'];


  constructor(private taskService:TaskListService) {}

  getList(){
    this.taskService.getTaskList().subscribe( data => this.taskList = data['list']); 
  }

  ngOnInit(){
    this.getList();
    console.log("Table content"+this.taskList);
    this.dataSource = new TaskTableDataSource(this.paginator, this.sort);  
  }
}