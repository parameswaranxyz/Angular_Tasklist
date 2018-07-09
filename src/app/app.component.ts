import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template:`<p>Welcome {{ title }}</p>
            <app-list></app-list>
            <app-add-task></app-add-task>
           `
})
export class AppComponent {
  title = 'TaskList';
}
