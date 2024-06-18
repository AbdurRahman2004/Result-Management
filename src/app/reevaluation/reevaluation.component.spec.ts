import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReevaluationComponent } from './reevaluation.component';

describe('ReevaluationComponent', () => {
  let component: ReevaluationComponent;
  let fixture: ComponentFixture<ReevaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReevaluationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReevaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
