import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskI } from '../TaskI';
import { HttpClient,HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  auth_token:boolean = false;
  data:any;

  _url:string = " /api/getTaskList";
  _url_getTree:string = " /api/getTaskListT";
  _url_add:string ="/api/addTask";
  _url_update:string ="/api/updateTask";
  _url_delete:string = "/api/deleteTask";
  _url_getATask:string = "/api/getTask";
  
  _url_signup:string = " /api/createUser";
  _url_login:string = " /api/userLogin";
  _url_logout:string = " /api/userLogout";
  
  constructor(private http:HttpClient) { }
 
  getATask(_id): Observable<TaskI> {
    console.log("Inside getATask"+_id);
    return this.http.get<TaskI>(this._url_getATask);//,JSON.stringify({"Task_id": _id}));
  }
  
  getTaskList(): Observable<TaskI[]> {
    return this.http.get<TaskI[]>(this._url);
  }

  getTaskListTree(): Observable<TaskI[]> {
    return this.http.get<TaskI[]>(this._url_getTree);
  }

  deleteTask(_id){
    console.log("_id:"+_id);
    return this.http.post(this._url_delete,JSON.stringify({"Task_id": _id}));
  }

  addTask(Task_id,Task_des,Task_priority,Task_weight,Task_dependant,Task_schedule){
    return this.http.post(this._url_add,JSON.stringify(
      {
        // "Task_id":Task_id,
      "Task_des":Task_des,
      "Task_priority":Task_priority,
      "Task_weight":Task_weight,
      "Task_dependant":Task_dependant,
      "Task_schedule":Task_schedule}));
  }

  updateTask(Task_id,Task_des,Task_priority,Task_weight,Task_dependant,Task_schedule){
    console.log("inside the service update"+Task_des,Task_priority,Task_weight,Task_dependant,Task_schedule);
    return this.http.post(this._url_update,JSON.stringify(
      {
      "Task_id":Task_id,
      "Task_des":Task_des,
      "Task_priority":Task_priority,
      "Task_weight":Task_weight,
      "Task_dependant":Task_dependant,
      "Task_schedule":Task_schedule}));
  }

  // constructor(private http:HttpClient) { }
 
  signup(username,password){
    console.log(username,password);
    return this.http.post(this._url_signup,JSON.stringify({"username": username,"password":password}));
  }

  login(username,password){
    console.log("Inside the login");
    this.data = this.http.post(this._url_login,JSON.stringify({"username": username,"password":password}));
    if (this.data['status']=='success')
      this.auth_token=true;

    return this.data;
  }

  logout(username,password){
    console.log("Inside the logout");
    this.data = this.http.post(this._url_logout,JSON.stringify({"username": username,"password":password}));
    if (this.data['status']=='success')
      this.auth_token=false;
    return this.data
  }

  authenticate(username){
    this.data = this.http.post(this._url_logout,JSON.stringify({"username": username,"password":password}));
    if (this.data['status']=='true')
        this.auth_token=true;
  }

  checkAuthentication(){
    return this.auth_token;
  }
}
