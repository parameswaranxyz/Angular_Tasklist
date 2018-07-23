import { Component, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { TaskListService } from '../task-list.service';
import { Tree } from '../../tree';

@Component({
  selector: 'app-expansion',
  templateUrl: './expansion.component.html',
  styleUrls: ['./expansion.component.css'],
})

// <app-expansion></app-expansion>
export class ExpansionComponent implements OnInit {

  dataObject:TaskI=null;
  tree:Tree = null;

  constructor(private taskService:TaskListService) { 
    this.taskService.getTaskListTree().subscribe(data => {
      this.tree = new Tree();
      this.tree.set(data['list']);
      console.log(this.tree);
      // root = this.tree.root;
    });
  }

  ngOnInit() {
    
  }
}
