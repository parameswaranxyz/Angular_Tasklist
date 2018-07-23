import { Component, OnInit, Input } from '@angular/core';
import { Tree } from '../../tree';
import { Task } from '../../Task';


@Component({
  selector: 'app-expansionrec',
  templateUrl: './expansionrec.component.html',
  styleUrls: ['./expansionrec.component.css']
})
export class ExpansionrecComponent implements OnInit {

  @Input() root:Tree;

  constructor() {
    
   }

  ngOnInit() {
    console.log("Inside the child:",this.root);
  }

}
