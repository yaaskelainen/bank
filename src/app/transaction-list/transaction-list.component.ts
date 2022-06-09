import { Component, OnInit } from '@angular/core';
import { Transaction } from '../models/transaction';
import { AccountService } from '../services/account.service';
import { TransactionService } from '../services/transaction.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions!:Transaction[];
  searchAccount!:string;
  searchAmount!:number;
  searchDate1!:Date;
  searchDate2!:Date;

        

  constructor(private accountService: AccountService, private userService:UserService, private transactionService:TransactionService) { }

  async ngOnInit(): Promise<void> {
    this.transactions = await this.transactionService.getTransactions();
    
  }

//   async getById() {
//     this.accounts[0] = await this.accountService.getAccountById(this.searchId);
//   }

   async searchByAccount() {
     this.transactions = await this.transactionService.filterTransactionsByAccount(this.searchAccount);
     
  }

  async searchByAmount() {
    this.transactions = await this.transactionService.filterTransactionsByAmount(this.searchAmount);
    
 }

 async searchByDates() {
  this.transactions = await this.transactionService.filterTransactionsByDate(this.searchDate1.toString(), this.searchDate2.toString());
  
}

//  async searchBySzig() {
//   this.users = await this.userService.filterUsersBySzig(this.searchSzig);
// }

// async searchById() {
//   this.users = await this.userService.filterUsersById(this.searchUserId);
// }

// async searchByName() {
//   this.users = await this.userService.filterUsersByName(this.searchName);
// }

// async onSelect(user: User): Promise<void> {
//   this.selectedUser = user;
//   this.accounts = await this.accountService.filterAccountsByUser(this.selectedUser.id);
//   this.selectionOkay = false;
  
// }
  
//  onSelectAccount(account: Account): void {
//   this.selectedAccount = account;
//   this.selectionOkay=true;

// }

// onSelectTargetAccount(account: Account): void {
//   this.selectedTargetAccount = account;
   
// }

// onClose():void{
//   this.ngOnInit();
// }

}
