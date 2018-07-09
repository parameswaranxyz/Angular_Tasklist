import { Component, OnInit } from '@angular/core';
import { Task } from '../../Task';
import { TaskListService } from '../task-list.service';
import { TaskI } from '../../TaskI';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  template:`
            <p> Applist </p>
            <p *ngFor="let item of taskList">
                {{item.Task_id}}
                {{item.Task_des}}
                {{item.Task_priority}}
                {{item.Task_weight}}
                {{item.Task_dependant}}
                {{item.Task_schedule}}
            </p>
            <p>{{ taskList}}</p>
           `
})

export class ListComponent implements OnInit {
  

  taskList: Task[] = []
  headers: string[];
  
  // taskList: Task[] = [{'Task_id': '12', 'Task_des': 'job A', 'Task_priority': 1, 'Task_weight': 3, 'Task_dependant': 'null',
  //  'Task_schedule': 2},
  // {'Task_id': '12', 'Task_des': 'job A', 'Task_priority': 1, 'Task_weight': 3, 'Task_dependant': 'null',
  //  'Task_schedule': 2}];

  // constructor(private taskService:TaskListService) { }

  // constructor(){}

  url:string = "/api/getTaskList";

  constructor(private httpClient: HttpClient,private taskService:TaskListService) {
    this.httpClient.get("/api/getTaskList").toPromise().then(response => {
    console.log(response['list']);
      // this.taskList=response['list'];
    })    
  }

  ngOnInit(){
    this.taskService.getTaskList().subscribe( function (data) { console.log(data['list']) })
  }


  // showConfigResponse() {
  //   this.taskService.getTaskResponse()
  //     .subscribe(resp => {
  //         this.taskList = resp.body;
  //     });
  // }

  // ngOnInit() {
  //   this.test = <JSON>this.taskService.getTaskListJson()
  //   // this.taskService.getTaskListJson().subscribe(data => this.sample_json = data);
  //   //  this.taskService.getTaskList().subscribe(data => this.taskList = data);
  // }

}