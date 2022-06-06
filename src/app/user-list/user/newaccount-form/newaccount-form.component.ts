import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account';
import { Transaction } from 'src/app/models/transaction';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-newaccount-form',
  templateUrl: './newaccount-form.component.html',
  styleUrls: ['./newaccount-form.component.css']
})
export class NewaccountFormComponent implements OnInit {

  successMsg: string = '';
  errorMsg: string = '';
  @Input()
  user!: User;
  
 
  accountForm: FormGroup = this.formBuilder.group({
    id: [],
    balance: [0, Validators.min(0)],
    deleted:[],
    user:[],
    transactions:[]
  });

 
 
  

  constructor(private accountService: AccountService, private transactionService: TransactionService,
    private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
     
  }

  get f(): { [key: string]: AbstractControl } {
    return this.accountForm.controls;
  }

  async addAccount() {
    const account = this.accountForm.value;
        
    account.user= this.user;
    
    account.deleted=false;
    
    try {
      
      const newAccount = await this.accountService.createAccount(account);
      this.successMsg = 'Sikerült új számlát rögzíteni, száma: ' + newAccount.id + "\n Egyenlege: " + newAccount.balance +" Ft";
      this.accountForm.reset();
      this.ngOnInit();

      
      // await this.transactionService.createTransaction(
      //   {
      //     id: '',
      //     goalaccountnr: '',
      //     amount: newAccount.balance,
      //     description: 'Számlanyitás',
      //     date: new Date(),
      //     account: newAccount

      //   }
      // );
     
      
    } catch (err: any) {
      this.errorMsg = err.error.message
    }
      
  }

  // async logTransaction(account:Account):Promise<void>{
  //   const transaction: Transaction ={
  //     id: '',
  //     goalaccountnr: '',
  //     amount: account.balance,
  //     description: 'Számlanyitás',
  //     date: new Date(),
  //     account: account
  //   }

  //   try{
  //     await this.transactionService.createTransaction(transaction);
  //   } catch (err: any) {
  //     this.errorMsg = err.error.message
  //   }
  // }
  
 }
