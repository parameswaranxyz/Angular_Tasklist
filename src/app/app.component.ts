import { Component } from '@angular/core';
import {TaskListService} from './task-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TaskList';
  constructor(private taskService:TaskListService){
    
  }
}
