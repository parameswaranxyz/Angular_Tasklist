import { Component, OnInit } from "@angular/core";
import {TaskListService} from '../task-list.service';
import {Router} from "@angular/router";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {

  constructor(private taskService:TaskListService,private router:Router) {}

  ngOnInit() {}

  onLogin(usrname, pass1) {
    this.taskService.login(usrname, pass1).subscribe(data => {
      console.log(data["status"]);
      this.auth_flag = data["status"];
      // if (data["status"] == "success" && authService.isLoggedIn()) {
      // }
    });
    console.log();
  }

  onLogout() {
    this.taskService.logout().subscribe(data => {
      console.log(data["status"]);
    });
    console.log();
  }
}
