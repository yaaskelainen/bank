import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccounttransferFormComponent } from './accounttransfer-form.component';

describe('AccounttransferFormComponent', () => {
  let component: AccounttransferFormComponent;
  let fixture: ComponentFixture<AccounttransferFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccounttransferFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccounttransferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
