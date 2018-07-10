import { Component, OnInit } from '@angular/core';
import {TaskListService} from '../task-list.service'
import { Task } from '../../Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  template:`
            <p>Hello welcome to the add bar {{addMessage}} </p>

              <input #Task_id (keyup)="0" name="Task_id" placeholder="Task_id"/>
              <input #Task_des (keyup)="0" name="Task_des" placeholder="Task_des"/>
              <input #Task_priority (keyup)="0"  name="Task_priority" placeholder="Task_priority"/>
              <input #Task_weight (keyup)="0"  name="Task_weight" placeholder="Task_weight"/>
              <label>Task_dependant</label>
              <select (change)="selectChangeHandler($event)"> 
                <option>None</option>
                <option #Task_dependant (keyup)="0" *ngFor="let item of optList" [value]="item.Task_id">{{item.Task_id}}</option>
              </select>
              <input #Task_schedule (keyup)="0"  name="Task_schedule" placeholder="Task_schedule"/>
              <button (click)="submitMe(Task_id.value,Task_des.value,Task_priority.value,Task_weight.value,selectedId,Task_schedule.value)">Save</button>
              `
})

export class AddTaskComponent implements OnInit {

  optList:Task[] = []

  active = true;

  addMessage:string = ""
  selectedId:string = ""

  constructor(private taskService:TaskListService) { }

  selectChangeHandler(event: any) {
    //update the ui
    if(event.target.value == "None")
      this.selectedId = "NULL";
    else
      this.selectedId = event.target.value;
    console.log(this.selectedId);
  }

  submitMe(Task_id,Task_des,Task_priority,Task_weight,Task_dependant,Task_schedule){
    // Task_dependant=this.selectedId;
    this.taskService.addTask(Task_id,Task_des,Task_priority,Task_weight,Task_dependant,Task_schedule)
                    .subscribe( data => this.addMessage = data['']);
    console.log("dasa"+this.addMessage);
    console.log(Task_id,Task_des,Task_priority,Task_weight,Task_dependant,Task_schedule);
  }

  getList(){
    // this.taskService.getTaskList().subscribe( data => this.optList = <TaskI[]>data['list']); 
    this.taskService.getTaskList().subscribe( data => this.optList = data['list']); 
    console.log(this.optList)
  }

  ngOnInit() {
    this.getList();
  }

}
