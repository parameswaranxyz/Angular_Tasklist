import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../Task';
import { TaskListService } from '../task-list.service';
import {Router, NavigationExtras} from "@angular/router";
import { Data } from "../data";
import {TaskI} from '../../TaskI';
import {MatPaginator, MatTableDataSource} from '@angular/material';
// import {UserDataSource} from '../../user-data';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})

export class ListComponent implements OnInit {

  displayedColumns:string[] = ['Id', 'description', 'priority','weight', 'dependant','schedule','control'];
  
  taskToEdit:Task;
  taskList:Task[] = [];
  deleteMessage:string = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private taskService:TaskListService,private router: Router,private dataStore: Data) {
    // this.dataSource = new UserDataSource(taskService);
  }

  getList(){
    this.taskService.getTaskList().subscribe( data => {
      this.taskList = <TaskI>data['list'];
      this.dataSource = this.taskList;
      this.dataSource.paginator = this.paginator;
      console.log("Datasource",this.dataSource);
    }); 
  }

  onSelect(editTask){
    this.taskToEdit = editTask;
    this.dataStore.storage = {
          "messageTask": this.taskToEdit
      };
    this.router.navigate(["/UpdateTask"]);
  }

  deleteMe(id){
    this.taskService.deleteTask(id).subscribe( data => this.deleteMessage = data['status']);
    this.router.navigate([""]);
    this.getList();
  }

  ngOnInit(){
    this.getList();
    // this.taskService.getTaskList().subscribe( data => this.dataSource = new MatTableDataSource<TaskI>(data['list']));
  }
}


import { DataSource } from '@angular/cdk/collections';

export class UserDataSource extends DataSource<any> {
     
  source;

    constructor(private taskService: TaskListService;) {
      super();
    }
  
    connect(): Observable<User[]> {
      this.taskService.getTaskList().subscribe( data => this.source = <TaskI>data['list']);
      return this.source;
    }

    disconnect() {}
  }