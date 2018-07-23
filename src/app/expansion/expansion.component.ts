import { Component, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-expansion',
  // templateUrl: './expansion.component.html',
  styleUrls: ['./expansion.component.css'],
  template:`
<mat-card>
  <mat-accordion class="example-headers-align">
    <mat-expansion-panel [expanded]="step === 0" (opened)="setStep(0)" hideToggle>
        <mat-expansion-panel-header>
          <mat-panel-title>
           Personal data
          </mat-panel-title>
          <mat-panel-description>
            Type your name and age
           <mat-icon>account_circle</mat-icon>
        </mat-panel-description>
      </mat-expansion-panel-header>
      [(ngModel)]="recCode"
    </mat-expansion-panel>
  </mat-accordion>
</mat-card>
  `
})

export class ExpansionComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
