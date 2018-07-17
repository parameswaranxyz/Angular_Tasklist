import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TaskI } from '../TaskI';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  _url:string = " /api/getTaskList";
  _url_add:string ="/api/addTask";
  _url_update:string ="/api/updateTask";
  _url_delete:string = "/api/deleteTask";
  _url_getATask:string = "/api/getTask";
  
  constructor(private http:HttpClient) { }
 
  getATask(_id): Observable<TaskI> {
    console.log("Inside getATask"+_id);
    return this.http.get<TaskI>(this._url_getATask);//,JSON.stringify({"Task_id": _id}));
  }
  
  getTaskList(): Observable<TaskI[]> {
    return this.http.get<TaskI[]>(this._url);
  }

  deleteTask(_id){
    console.log("_id:"+_id);
    return this.http.post(this._url_delete,JSON.stringify({"Task_id": _id}));
  }

  addTask(Task_id,Task_des,Task_priority,Task_weight,Task_dependant,Task_schedule){
    return this.http.post(this._url_add,JSON.stringify(
      {"Task_id":Task_id,
      "Task_des":Task_des,
      "Task_priority":Task_priority,
      "Task_weight":Task_weight,
      "Task_dependant":Task_dependant,
      "Task_schedule":Task_schedule}));
  }

  updateTask(Task_id,Task_des,Task_priority,Task_weight,Task_dependant,Task_schedule){
    console.log("inside the service update"+Task_id,Task_des,Task_priority,Task_weight,Task_dependant,Task_schedule);
    return this.http.post(this._url_update,JSON.stringify(
      {"Task_id":Task_id,
      "Task_des":Task_des,
      "Task_priority":Task_priority,
      "Task_weight":Task_weight,
      "Task_dependant":Task_dependant,
      "Task_schedule":Task_schedule}));
  }
}
