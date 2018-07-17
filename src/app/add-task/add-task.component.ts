import { Component, OnInit } from '@angular/core';
import {TaskListService} from '../task-list.service'
import { Task } from '../../Task';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  // template:`  `
})

export class AddTaskComponent implements OnInit {

  optList:Task[] = []

  active = true;

  addMessage:string = "";
  selectedValue:string = "NULL";

  constructor(private taskService:TaskListService,private router:Router,public dialogRef: MatDialogRef<AddTaskComponent>) { }

  // selectChangeHandler(event: any) {
  //   //update the ui
  //   if(event.target.value == "None")
  //     this.selectedId = "NULL";
  //   else
  //     this.selectedId = event.value;

  //   console.log(this.selectedId);
  // }

  onCancel(message){
    this.dialogRef.close(message);
  }
  
  someMethod(event:any){
    console.log('Some option selected' + event.value);
  }

  success:string;
  submitMe(Task_id,Task_des,Task_priority,Task_weight,Task_dependant,Task_schedule){
    // Task_dependant=this.selectedId;
    this.taskService.addTask(Task_id,Task_des,Task_priority,Task_weight,Task_dependant,Task_schedule)
                    .subscribe(data =>{
                      if(data){
                        this.addMessage = data['status'];
                        console.log(this.addMessage);  
                        console.log(Task_id,Task_des,Task_priority,Task_weight,Task_dependant,Task_schedule);    
                        this.onCancel(this.addMessage);              
                      }
                      else{
                        this.onCancel("fail");
                      }
                    });

    // while(this.addMessage != ""){}
      // addMessage="Loding.....";
    // this.router.navigate([""]);
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
