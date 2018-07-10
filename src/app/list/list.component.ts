import { Component, OnInit } from '@angular/core';
import { Task } from '../../Task';
import { TaskListService } from '../task-list.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  template:`
            <div style="color:black">Notification:
              <p>Delete Notifaction:{{deleteMessage}}</p>
            </div>
            <div *ngFor="let item of taskList" style="padding:5px;border:1px solid white;display:block;background-color:black;color:white" (click)="onSelect(item)">
                {{item.Task_id}}
                {{item.Task_des}}
                {{item.Task_priority}}
                {{item.Task_weight}}
                {{item.Task_dependant}}
                {{item.Task_schedule}}
                <button (click)="deleteMe(item.Task_id)">Delete</button>
            </div>
            <app-update-task [messageTask]="taskToEdit"></app-update-task>           
           `
})

export class ListComponent implements OnInit {
  
  taskToEdit:Task
  taskList:Task[] = [] 
  deleteMessage:string = ""
  // taskList:Task[] = [{'Task_id': '12', 'Task_des': 'job A', 'Task_priority': 1, 'Task_weight': 3, 'Task_dependant': 'null',
  //  'Task_schedule': 2},
  // {'Task_id': '12', 'Task_des': 'job A', 'Task_priority': 1, 'Task_weight': 3, 'Task_dependant': 'null',
  //  'Task_schedule': 2}];

  constructor(private taskService:TaskListService) {}

  getList(){
    this.taskService.getTaskList().subscribe( data => this.taskList = data['list']); 
  }

  onSelect(editTask){
    this.taskToEdit = editTask;
    console.log(editTask);
  }

  deleteMe(id){
    this.taskService.deleteTask(id).subscribe( data => this.deleteMessage = "Removed the Task " + data['status']);
    // if (this.deleteMessage == "Removed the Task success")
    this.getList();
  }

  ngOnInit(){
    this.getList();
    console.log(this.taskList);
  }
}