import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { HttpClientModule } from '@angular/common/http';

import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
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
import { FormComponent } from './form/form.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule,MatExpansionModule} from '@angular/material';
import { TreeComponent } from './tree/tree.component';
// import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeModule} from '@angular/material/tree';
import { ExpansionComponent } from './expansion/expansion.component';
import { SignupComponent } from './signup/signup.component';
// import { AuthService } from "./auth.service";
import { TaskListService } from './task-list.service';
// import {MatTreeFlattener} from '@angular/material/tree';

const appRoutes: Routes = [
  { path: '', component:SignupComponent },
  { path: 'list', component:ListComponent },
  { path: 'tree', component:TreeComponent},
  { path: 'expansion', component:ExpansionComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ListComponent,
    TreeComponent,
    ExpansionComponent,
    SignupComponent,
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
    MatSliderModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatTreeModule,
    MatExpansionModule,
    // MatTreeFlattener,
    // FlatTreeControl,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } 
    )
  ],
  entryComponents: [
    FormComponent,
  ],
  providers: [TaskListService,Data],
  bootstrap: [AppComponent]
})
export class AppModule { }
