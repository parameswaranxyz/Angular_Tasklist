import { Component, OnInit } from '@angular/core';
import { Task } from '../../Task';
import { TaskListService } from '../task-list.service';
import {Router, NavigationExtras} from "@angular/router";
import { Data } from "../data";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  // template:``
})

export class ListComponent implements OnInit {
  
  taskToEdit:Task;
  taskList:Task[] = [] 
  deleteMessage:string = ""
  // taskList:Task[] = [{'Task_id': '12', 'Task_des': 'job A', 'Task_priority': 1, 'Task_weight': 3, 'Task_dependant': 'null',
  //  'Task_schedule': 2},
  // {'Task_id': '12', 'Task_des': 'job A', 'Task_priority': 1, 'Task_weight': 3, 'Task_dependant': 'null',
  //  'Task_schedule': 2}];

  constructor(private taskService:TaskListService,private router: Router,private dataStore: Data) {}

  getList(){
    this.taskService.getTaskList().subscribe( data => this.taskList = data['list']); 
  }

  onSelect(editTask){
    this.taskToEdit = editTask;
    // console.log(editTask);
    this.dataStore.storage = {
          "messageTask": this.taskToEdit
      };
    this.router.navigate(["/UpdateTask"]);
  }

  deleteMe(id){
    this.taskService.deleteTask(id).subscribe( data => this.deleteMessage = data['status']);
    // if(this.deleteMessage=="success"){
    //   console.log("Enter the remove list");  
    //   this.taskList.forEach(element => {
    //       if(element.Task_id==id){
    //         console.log("remove from list"+element);
    //       }
    //   });
    //   console.log()
    // }
    this.router.navigate([""]);
    this.getList();
  }

  ngOnInit(){
    this.getList();
    // taskList = new TaskTableDataSource();
    
    console.log(this.taskList);
  }

  
}