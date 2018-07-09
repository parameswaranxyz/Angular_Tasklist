import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template:`<p>hello {{ title }}</p>
            <app-list></app-list>
           `
})
export class AppComponent {
  title = 'TaskList';
}
