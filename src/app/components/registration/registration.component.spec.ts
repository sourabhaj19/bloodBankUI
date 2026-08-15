import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not request geolocation automatically in edit mode', () => {
    const spy = spyOn(component, 'getLocation');
    component.isEditable = true;

    component.ngAfterViewInit();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should request geolocation only when user opts in', () => {
    const spy = spyOn(component, 'getLocation');

    component.useCurrentLocation();

    expect(component.allowLocation).toBeTrue();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
