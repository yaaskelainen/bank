import { Component, OnInit } from '@angular/core';
import { Account } from '../models/account';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  accounts!: Account[];
  users!:User[];
  tempArray!:Account[];
  searchId!: string;
  searchUser!: string;
  searchUserId!: string;
  searchName!: string;
  searchSzig!: string;
  selectedUser!: User;
  selectedAccount?: Account;
  selectionOkay:boolean=false;
               

  constructor(private accountService: AccountService, private userService:UserService) { }

  async ngOnInit(): Promise<void> {
    this.accounts = await this.accountService.getAccounts();
    this.users = await this.userService.getUsers();
  }

  async getById() {
    this.accounts[0] = await this.accountService.getAccountById(this.searchId);
  }

  async searchByUser() {
    this.accounts = await this.accountService.filterAccountsByUser(this.searchUser);
    console.log(this.accounts);
 }

 async searchBySzig() {
  this.users = await this.userService.filterUsersBySzig(this.searchSzig);
}

async searchById() {
  this.users = await this.userService.filterUsersById(this.searchUserId);
}

async searchByName() {
  this.users = await this.userService.filterUsersByName(this.searchName);
}

async onSelect(user: User): Promise<void> {
  this.selectedUser = user;
  this.accounts = await this.accountService.filterAccountsByUser(this.selectedUser.id);
  this.selectionOkay = false;
  
}
  
async onSelectAccount(account: Account): Promise<void> {
  this.selectedAccount = account;
  this.selectionOkay=true;

}

isSameUser(firstUser:User, secondUser:User):boolean{
  if(firstUser.id==secondUser.id){
    return true;
  } else{
    return false;
  }
}

}
