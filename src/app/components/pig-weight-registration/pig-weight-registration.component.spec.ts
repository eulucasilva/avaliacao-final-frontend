import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PigWeightRegistrationComponent } from './pig-weight-registration.component';

describe('PigWeightRegistrationComponent', () => {
  let component: PigWeightRegistrationComponent;
  let fixture: ComponentFixture<PigWeightRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PigWeightRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PigWeightRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
