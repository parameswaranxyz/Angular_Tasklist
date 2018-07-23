import { Component, OnInit } from '@angular/core';
import {TaskListService} from '../task-list.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private taskService:TaskListService,private router:Router) { }

  ngOnInit() {
  }

  onSignup(usrname,pass1,pass2) {
    if(pass1 == pass2){
      // console.log(usrname,pass1);
      this.taskService.signup(usrname,pass1).subscribe(data=>{
        console.log(data['status']);
      });
      console.log();
    }
    else{
      console.log("failed");
    }
  }
}