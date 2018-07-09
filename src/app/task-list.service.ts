import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskI } from '../TaskI';
import { HttpResponse } from "@angular/common/http"
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  _url:string = " /api/getTaskList";
  _url_delete:string = "/api/deleteTask";

  constructor(private http:HttpClient) { }
 
    
  getTaskList(): Observable<TaskI[]> {
    return this.http.get<TaskI[]>(this._url);
  }
    // getTaskList(){
    // }

    // getTaskResponse(): Observable<HttpResponse<TaskI[]>> {
    //   return this.http.get<TaskI[]>(
    //     this._url, { observe: 'response' });
    // }

  // getTaskList():Observable<TaskI[]>{  
  //   console.log("this is retrun by server"+this.http.get<TaskI[]>(this._url));
  //   return this.http.get<TaskI[]>(this._url);  
  // }
  
  // getTaskListJson(){  
  //   console.log("this is retrun by server"+this.http.get<TaskI[]>(this._url));
  //   return this.http.get(this._url);
  // }

  // deleteTaskList(){
  //   return this.http.put(this._url_delete,{Task_id: 5 });
  // }
}
