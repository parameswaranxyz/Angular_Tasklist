import { Component, OnInit } from '@angular/core';
import {TaskListService} from '../task-list.service'
import { Task } from '../../Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  // template:`  `
})

export class AddTaskComponent implements OnInit {

  optList:Task[] = []

  active = true;

  addMessage:string = ""
  selectedId:string = "NULL"

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
                    .subscribe( data => this.addMessage = data['status']);
    
    console.log(this.addMessage);  
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
