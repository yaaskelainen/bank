import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/models/transaction';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input()
  user!: User;
  selectUser?: User;
  isSelected:boolean=false;
  shouldRefresh:boolean=false;
  successMsg: any;
  errorMsg: any;

  constructor(private router: Router, private userService: UserService, private accountService: AccountService, private transactionService: TransactionService) { }

  ngOnInit(): void {
  }

  async select(id: string){
    if(!this.isSelected){
      this.selectUser = await this.userService.getUserById(id);
      this.isSelected=true;
    } else{
      this.isSelected=false;
    }
   
  }

  async delete(id:string) {
    await this.userService.deleteUser(id);

    this.selectUser = await this.userService.getUserById(this.user.id);
  }

  async getNotification(evt: boolean) {
    this.shouldRefresh=evt;
    if(this.shouldRefresh){
      this.selectUser = await this.userService.getUserById(this.user.id);
    }
  }

  }
