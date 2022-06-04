import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';

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

 
 
  

  constructor(private accountService: AccountService,
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
      this.ngOnInit();
    } catch (err: any) {
      this.errorMsg = err.error.message
    }
  }
  
 }
