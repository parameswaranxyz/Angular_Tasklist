import { Component, OnInit, Input } from '@angular/core';
import { TaskListService } from '../task-list.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css'],
  // template:``
})

export class UpdateTaskComponent implements OnInit {

  @Input() messageTask: Task;

  tasktoedit:Task = this.messageTask;
  updateMessage:string = "";
  optionList:Task[]=[];
  singleTask:Task ;
  selectedId:string = "NULL";
  
  constructor(private taskService:TaskListService) {}

  selectChangeHandler(event: any) {
    //update the ui
    if(event.target.value == "None")
      this.selectedId = "NULL";
    else
      this.selectedId = event.target.value;
    console.log(this.selectedId);
  }
  
  submitMe(Task_id,Task_des,Task_priority,Task_weight,Task_dependant,Task_schedule){
    this.taskService.updateTask(Task_id,Task_des,Task_priority,Task_weight,Task_dependant,Task_schedule)
                    .subscribe( data => this.updateMessage = data['status']);
    
    console.log("inside the updation submit "+Task_id,Task_des,Task_priority,Task_weight,Task_dependant,Task_schedule);
  }

  getList(){
    this.taskService.getTaskList().subscribe( data => this.optionList = data['list']); 
  }

  ngOnInit() {
    this.getList();
  }

}
