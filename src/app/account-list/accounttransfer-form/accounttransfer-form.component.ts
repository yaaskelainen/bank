import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account';
import { Transaction } from 'src/app/models/transaction';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-accounttransfer-form',
  templateUrl: './accounttransfer-form.component.html',
  styleUrls: ['./accounttransfer-form.component.css'],
})
export class AccounttransferFormComponent implements OnInit {
  successMsg: string = '';
  errorMsg: string = '';
  @Input()
  homeAccount!: Account;
  @Input()
  targetAccount!: Account;
 

  accountForm: FormGroup = this.formBuilder.group({
    amount: [0, Validators.min(1)],
    description: [''],
  });

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get f(): { [key: string]: AbstractControl } {
    return this.accountForm.controls;
  }

  async transfer() {
    const storedHomeAccountBalance: number = this.homeAccount.balance;
    const storedTargetAccountBalance: number = this.targetAccount.balance;
    

    const amount = this.accountForm.value.amount;
    let description = this.accountForm.value.description;
    if (description == null) {
      description = '';
    }

    if (this.homeAccount.balance - amount >= 0) {
      const newBalanceHome = this.homeAccount.balance - amount;
      this.homeAccount.balance = newBalanceHome;

      const newBalanceTarget = this.targetAccount.balance + amount;
      this.targetAccount.balance = newBalanceTarget;

      try {
        let changedHomeAccount = await this.accountService.updateAccount(
          this.homeAccount
        );
        let changedTargetAccount = await this.accountService.updateAccount(
          this.targetAccount
        );
        console.log(storedHomeAccountBalance)
          
        if (
          changedHomeAccount.balance + amount == storedHomeAccountBalance &&
          changedTargetAccount.balance - amount == storedTargetAccountBalance
        ) {
          try {
            await this.transactionService.createTransaction({
              id: '',
              goalaccountnr: changedTargetAccount.id,
              amount: -amount,
              description: description,
              date: new Date(),
              account: await this.accountService.getAccountById(
                changedHomeAccount.id
              ),
            });
            await this.transactionService.createTransaction({
              id: '',
              goalaccountnr: changedHomeAccount.id,
              amount: amount,
              description: description,
              date: new Date(),
              account: await this.accountService.getAccountById(
                changedTargetAccount.id
              ),
            });
          } catch (err: any) {
            this.errorMsg = err.error.message;
          }
          this.successMsg = 'Sikeres utalás összege: ' + amount + ' Ft ';
          this.accountForm.reset();
          this.ngOnInit();
        } else {
          try {
            changedHomeAccount= await this.accountService.getAccountById(changedHomeAccount.id);
            changedHomeAccount.balance=storedHomeAccountBalance;
            changedTargetAccount= await this.accountService.getAccountById(changedTargetAccount.id);
            changedTargetAccount.balance=storedTargetAccountBalance
            await this.accountService.updateAccount(changedHomeAccount);
            await this.accountService.updateAccount(changedTargetAccount);
            await this.transactionService.createTransaction({
              id: '',
              goalaccountnr: changedTargetAccount.id,
              amount: -amount,
              description: 'MEGHIÚSULT UTALÁS',
              date: new Date(),
              account: await this.accountService.getAccountById(
                changedHomeAccount.id
              ),
            });
            await this.transactionService.createTransaction({
              id: '',
              goalaccountnr: changedHomeAccount.id,
              amount: amount,
              description: 'MEGHIÚSULT UTALÁS',
              date: new Date(),
              account: await this.accountService.getAccountById(
                changedTargetAccount.id
              ),
            });
          } catch (err: any) {
            this.errorMsg = err.error.message;
          }
          this.errorMsg = 'Meghiúsult az utalás!';
          this.accountForm.reset();
          this.ngOnInit();
        }
      } catch (err: any) {
        this.errorMsg = err.error.message;
        this.ngOnInit();
      }
    } else {
      this.errorMsg = "Nem áll rendelkezésre fedezet!";
      this.ngOnInit();
    }
  }
}
