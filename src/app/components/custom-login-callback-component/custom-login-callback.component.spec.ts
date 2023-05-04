import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCallBackComponentComponent } from './custom-call-back.component';

describe('CustomCallBackComponentComponent', () => {
  let component: CustomCallBackComponentComponent;
  let fixture: ComponentFixture<CustomCallBackComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomCallBackComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomCallBackComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
