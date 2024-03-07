import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiglistComponent } from './piglist.component';

describe('PiglistComponent', () => {
  let component: PiglistComponent;
  let fixture: ComponentFixture<PiglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PiglistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PiglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
