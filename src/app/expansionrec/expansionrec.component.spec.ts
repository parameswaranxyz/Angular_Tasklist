import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionrecComponent } from './expansionrec.component';

describe('ExpansionrecComponent', () => {
  let component: ExpansionrecComponent;
  let fixture: ComponentFixture<ExpansionrecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpansionrecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionrecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
