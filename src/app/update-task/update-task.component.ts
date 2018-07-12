import { Component, OnInit, Input } from '@angular/core';
import { TaskListService } from '../task-list.service';
import { Task } from '../../Task';
import { TaskI } from '../../TaskI';
import {ActivatedRoute,Router} from '@angular/router';
import { Data } from "../data";

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css'],
  // template:``
})

export class UpdateTaskComponent implements OnInit {
  messageTask:Task;
  updateMessage:string = "";
  optionList:Task[]=[];
  singleTask:Task ;
  selectedValue:string;
  
  constructor(private taskService:TaskListService,private data: Data,private router:Router) {
      // console.log("hello"+JSON.stringify(this.data.storage['messageTask']));
      // console.log("welcome" + <TaskI>this.data.storage['messageTask']);
      this.messageTask = <TaskI>this.data.storage['messageTask']; 
  }

  // selectChangeHandler(event: any) {
  //   console.log("adsindas");
  //   //update the ui
  //   if(event.target.value == "None")
  //     this.selectedId = "NULL";
  //   else
  //     this.selectedId = event.target.value;
  //   console.log(this.selectedId);
  // }
  
  submitMe(Task_id,Task_des,Task_priority,Task_weight,Task_dependant,Task_schedule){
    this.taskService.updateTask(Task_id,Task_des,Task_priority,Task_weight,Task_dependant,Task_schedule)
                    .subscribe( data => this.updateMessage = data['status']);
    
    console.log("inside the updation submit "+Task_id,Task_des,Task_priority,Task_weight,Task_dependant,Task_schedule);
    this.router.navigate([""]);
  }

  getList(){
    this.taskService.getTaskList().subscribe( data => this.optionList = data['list']); 
  }

  ngOnInit() {
    this.getList();
  }

}
