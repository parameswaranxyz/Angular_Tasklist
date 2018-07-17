import { Component, OnInit } from "@angular/core";
import { Data } from "../data";
import {MatDialogRef} from '@angular/material';
import {TaskListService} from '../task-list.service'
import { TaskI} from '../../TaskI';
import { Task} from '../../Task';

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  optList: TaskI[] = [];
  addMessage: string = "";
  selectedValue: string = "NULL";
  fromName:string='';
  
  messageTask: TaskI;

  constructor(
    private taskService: TaskListService,
    private data: Data,
    public dialogRef: MatDialogRef<AddTaskComponent>
  ) {
    
    if(this.data.storage === undefined){
      this.fromName='Add Task Entry';
      this.messageTask = new Task();
    }else{
      this.fromName='Update Task Entry';
      this.messageTask = <TaskI>this.data.storage["messageTask"];
    }
  }

  onCancel(message) {
    this.dialogRef.close(message);
  }

  submitMe(
    Task_id,
    Task_des,
    Task_priority,
    Task_weight,
    Task_dependant,
    Task_schedule
  ) {
    if(this.data.storage === undefined){
    this.taskService
      .addTask(
        Task_id,
        Task_des,
        Task_priority,
        Task_weight,
        Task_dependant,
        Task_schedule
      )
      .subscribe(data => {
        if (data) {
          this.addMessage = data["status"];
          this.onCancel(this.addMessage);
        } else {
          this.onCancel("fail");
        }
      });
    }
    else{
      this.taskService
      .updateTask(
        Task_id,
        Task_des,
        Task_priority,
        Task_weight,
        Task_dependant,
        Task_schedule
      )
      .subscribe(data => {
        if (data) {
          this.addMessage = data["status"];
          this.onCancel(this.addMessage);
        } else {
          this.onCancel("fail");
        }
      });
    }
  }

  getList() {
    this.taskService
      .getTaskList()
      .subscribe(data => (this.optList = data["list"]));
    console.log(this.optList);
  }

  ngOnInit() {
    this.getList();
  }
}
