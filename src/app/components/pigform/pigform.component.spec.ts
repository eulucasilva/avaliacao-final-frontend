import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PigformComponent } from './pigform.component';

describe('PigformComponent', () => {
  let component: PigformComponent;
  let fixture: ComponentFixture<PigformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PigformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PigformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
