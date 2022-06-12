import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { Account } from 'src/app/models/account';
import { Transaction } from 'src/app/models/transaction';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-accountbalance-form',
  templateUrl: './accountbalance-form.component.html',
  styleUrls: ['./accountbalance-form.component.css']
})
export class AccountbalanceFormComponent implements OnInit {

  successMsg: string = '';
  errorMsg: string = '';
  @Input()
  account!: Account;
  
 
  accountForm: FormGroup = this.formBuilder.group({
    amount: [0, Validators.min(0)],
    description:['']
  });

 
 
  

  constructor(private accountService: AccountService, private transactionService: TransactionService, private userService: UserService,
    private formBuilder: FormBuilder, private router: Router) { 
      
    }

   ngOnInit():void {
        console.log(this.account)

  }

  get f(): { [key: string]: AbstractControl } {
    return this.accountForm.controls;
  }

  async addToBalance() {
    const amount = this.accountForm.value.amount;
    const description = this.accountForm.value.description;
    
    const newBalance = this.account.balance + amount;
    this.account.balance = newBalance;

    const transaction: Transaction ={
      id: '',
      goalaccountnr: '',
      amount: amount,
      description: description,
      date: new Date(),
      account: await this.accountService.getAccountById(this.account.id)
    }
     
    try {
     

      const changedAccount = await this.accountService.updateAccount(this.account);
      await this.transactionService.createTransaction(transaction);
      this.successMsg = 'Sikeres befizetés összege: ' + amount + " Ft \n Egyenlege: " + changedAccount.balance +" Ft";
      this.accountForm.reset();
      this.ngOnInit();
    } catch (err: any) {
      this.errorMsg = err.error.message
    }
  }

  async deductFromBalance() {
    const amount = this.accountForm.value.amount;
    let description = this.accountForm.value.description;
    if(description==null){
      description='';
    }
    
    if((this.account.balance-amount)>=0){
    const newBalance = this.account.balance - amount;
    this.account.balance = newBalance;


    const transaction: Transaction ={
      id: '',
      goalaccountnr: '',
      amount: -amount,
      description: description,
      date: new Date(),
      account: await this.accountService.getAccountById(this.account.id)
    }
     
    try {
     

      const changedAccount = await this.accountService.updateAccount(this.account);
      await this.transactionService.createTransaction(transaction);
      this.successMsg = 'Sikeres kifizetés összege: ' + amount + " Ft \n Egyenlege: " + changedAccount.balance +" Ft";
      this.errorMsg='';
      this.accountForm.reset();
      this.ngOnInit();
    } catch (err: any) {
      this.errorMsg = err.error.message
    }


    } else{
      this.errorMsg = amount +" Ft összeg nem fizethető ki, nem áll rendelkezésre fedezet!";
      this.successMsg='';
      
    }
    

   
  }

  async closeAccount() {
    const amount = this.account.balance;
    const description = "Zárolás!";
    
    this.account.balance = 0;
    this.account.deleted=true;


    const transaction: Transaction ={
      id: '',
      goalaccountnr: '',
      amount: -amount,
      description: description,
      date: new Date(),
      account: await this.accountService.getAccountById(this.account.id)
    }
     
    try {
     

      const changedAccount = await this.accountService.updateAccount(this.account);
      await this.transactionService.createTransaction(transaction);
      this.successMsg ='Számla zárolva, kifizetés összege: ' + amount + " Ft";
    
      this.ngOnInit();
    } catch (err: any) {
      this.errorMsg = err.error.message
    }


  
    

   
  }
  
 }


