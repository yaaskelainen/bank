import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountbalanceFormComponent } from './accountbalance-form.component';

describe('AccountbalanceFormComponent', () => {
  let component: AccountbalanceFormComponent;
  let fixture: ComponentFixture<AccountbalanceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountbalanceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountbalanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
