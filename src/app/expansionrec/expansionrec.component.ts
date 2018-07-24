import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Tree } from '../../tree';
import { Task } from '../../Task';


@Component({
  selector: 'app-expansionrec',
  templateUrl: './expansionrec.component.html',
  styleUrls: ['./expansionrec.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ExpansionrecComponent implements OnInit {

  @Input() root:Tree;
  // allExpandState=false;

  constructor() {  
   }

  ngOnInit() {
    console.log("Inside the child:",this.root);
  }

  sortArray(x){
    x.sort((a, b) => a.Task_priority < b.Task_priority ? -1 : a.Task_priority > b.Task_priority ? 0 : 1);
    return x;
  }

}
