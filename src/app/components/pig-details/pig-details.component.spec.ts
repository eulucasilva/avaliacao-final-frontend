import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PigDetailsComponent } from './pig-details.component';

describe('PigDetailsComponent', () => {
  let component: PigDetailsComponent;
  let fixture: ComponentFixture<PigDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PigDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PigDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
