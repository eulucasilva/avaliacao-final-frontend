import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PigListComponent } from './pig-list.component';

describe('PiglistComponent', () => {
  let component: PigListComponent;
  let fixture: ComponentFixture<PigListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PigListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
