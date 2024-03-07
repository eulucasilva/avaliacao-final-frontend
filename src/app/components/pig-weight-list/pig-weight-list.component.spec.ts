/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PigWeightListComponent } from './pig-weight-list.component';

describe('PigWeightListComponent', () => {
  let component: PigWeightListComponent;
  let fixture: ComponentFixture<PigWeightListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PigWeightListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PigWeightListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
