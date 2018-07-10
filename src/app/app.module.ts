import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskListService } from './task-list.service';
import { UpdateTaskComponent } from './update-task/update-task.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddTaskComponent,
    UpdateTaskComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [TaskListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
