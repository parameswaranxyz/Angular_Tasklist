import { Component, OnInit } from '@angular/core';
import {TaskListService} from '../task-list.service'
import { Task } from '../../Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  template:`
            <p>Hello welcome to the add bar {{deleteMessage}}</p>

              <input #Task_id (keyup)="0" name="Task_id" placeholder="Task_id"/>
              <input #Task_des (keyup)="0" name="Task_des" placeholder="Task_des"/>
              <input #Task_priority (keyup)="0"  name="Task_priority" placeholder="Task_priority"/>
              <input #Task_weight (keyup)="0"  name="Task_weight" placeholder="Task_weight"/>
              <label>Task_dependant</label>
              <select>
                <option>-------</option>
                <option #Task_dependant (keyup)="0" *ngFor="let item of optList" [value]="item.Task_id">{{item.Task_id}}</option>
              </select>
              <input #Task_schedule (keyup)="0"  name="Task_schedule" placeholder="Task_schedule"/>
              <button (click)="submitMe(Task_id.value,Task_des.value,Task_priority.value,Task_weight.value,'NULL',Task_schedule.value)">Save</button>
              `
})

export class AddTaskComponent implements OnInit {

  optList:Task[] = []

  active = true;

  addMessage:string = ""

  constructor(private taskService:TaskListService) { }

  submitMe(Task_id,Task_des,Task_priority,Task_weight,Task_dependant,Task_schedule){
    this.taskService.addTask(Task_id,Task_des,Task_priority,Task_weight,Task_dependant,Task_schedule)
                    .subscribe( data => this.addMessage = data['list']);
    
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
