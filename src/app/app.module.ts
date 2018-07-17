import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskListService } from './task-list.service';
import { UpdateTaskComponent } from './update-task/update-task.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { TaskTableComponent } from './task-table/task-table.component';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {Data} from "./data";
import {MatProgressSpinnerModule,MatProgressBarModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';


const appRoutes: Routes = [
  { path: '', component:ListComponent },
  { path: 'AddTask', component: AddTaskComponent },
  { path: 'UpdateTask', component: UpdateTaskComponent },
  { path: 'TaskTable', component: TaskTableComponent },
  
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddTaskComponent,
    UpdateTaskComponent,
    TaskTableComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } 
    )
  ],
  entryComponents: [
    AddTaskComponent,
  ],
  providers: [TaskListService,Data],
  bootstrap: [AppComponent]
})
export class AppModule { }
