import { Component, OnInit, Input } from '@angular/core';
import { TaskListService } from '../task-list.service';
import { Task } from '../../Task';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css'],
  template:`
              <p>Hello welcome to the update bar {{updateMessage}}</p>

              <input #Task_id (keyup)="0" name="Task_id" placeholder="Task_id" value={{messageTask.Task_id}}/>
              <input #Task_des (keyup)="0" name="Task_des" placeholder="Task_des" value={{messageTask.Task_des}}/>
              <input #Task_priority (keyup)="0"  name="Task_priority" placeholder="Task_priority" value={{messageTask.Task_priority}}/>
              <input #Task_weight (keyup)="0"  name="Task_weight" placeholder="Task_weight" value={{messageTask.Task_weight}}/>
              <label>Task_dependant</label>
              <select (change)="selectChangeHandler($event)">
                <option>None</option>
                <option #Task_dependant (keyup)="0" *ngFor="let item of optList" [value]="item.Task_id">{{item.Task_id}}</option>
              </select>
              <input #Task_schedule (keyup)="0"  name="Task_schedule" placeholder="Task_schedule" value={{messageTask.Task_schedule}}/>
              <button (click)="submitMe(Task_id.value,Task_des.value,Task_priority.value,Task_weight.value,selectedId,Task_schedule.value)">Save</button>
              `
})
export class UpdateTaskComponent implements OnInit {

  @Input() messageTask: Task;

  tasktoedit:Task = this.messageTask;
  updateMessage:string
  optList:Task[]=[]
  singleTask:Task 
  selectedId:string = "NULL"
  
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
    this.taskService.getTaskList().subscribe( data => this.optList = data['list']); 
  }

  ngOnInit() {
    this.getList();
  }

}
