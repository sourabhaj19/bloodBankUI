import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindBloodComponent } from './find-blood.component';

describe('FindBloodComponent', () => {
  let component: FindBloodComponent;
  let fixture: ComponentFixture<FindBloodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindBloodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindBloodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
