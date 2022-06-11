import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account';
import { Transaction } from 'src/app/models/transaction';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';

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
  @Output() 
  notifyParent: EventEmitter<boolean> = new EventEmitter();
 
  accountForm: FormGroup = this.formBuilder.group({
    id: [],
    balance: [0, Validators.min(0)],
    deleted:[],
    user:[],
    transactions:[]
  });

 
 
  

  constructor(private accountService: AccountService, private userService: UserService, private transactionService: TransactionService,
    private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
     
  }

  get f(): { [key: string]: AbstractControl } {
    return this.accountForm.controls;
  }

  async addAccount() {
    
    const account = this.accountForm.value;
    
    
    account.user = this.user;
    account.deleted=false;
    if(this.accountForm.value.balance == null){
      account.balance=0;
    }
    
    try {
      const storedNewAccount = await this.newAccount(account);
      
      if(storedNewAccount.balance>0){
      const transaction:Transaction={
        
          id: '',
          goalaccountnr: '',
          amount: storedNewAccount.balance,
          description: "Számlanyitás befizetés",
          date: new Date(),
          account: await this.accountService.getAccountById(storedNewAccount.id)
        
      }
           
      await this.newTransaction(transaction);
      }

           
    } catch (err: any) {
      this.errorMsg = err.error.message
    }
    
    
    try {
    this.user= await this.userService.getUserById(this.user.id);
    } catch (err: any) {
      this.errorMsg = err.error.message
    }

  }

async newAccount(account:Account ):Promise<Account>{
  let storedAccount:any={};
  
  try {
    const newAccount = await this.accountService.createAccount(account);
    storedAccount= newAccount;
    this.successMsg = 'Sikerült új számlát rögzíteni, száma: ' + newAccount.id + "\n Egyenlege: " + newAccount.balance +" Ft";
    this.accountForm.reset();
    
    
  } catch (err: any) {
    this.errorMsg = err.error.message
  
  }

  return storedAccount;
}

async newTransaction(trans:Transaction):Promise<void>{
  try {
    await this.transactionService.createTransaction(trans);
    this.sendNotification();
 
   } catch (err: any) {
     this.errorMsg = err.error.message
   }
}


  sendNotification() {
        this.notifyParent.emit(true);
  }
  
 }
