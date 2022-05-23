import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  async getTransactions(){
    return await this.http.get<Transaction[]>('/api/transactions').toPromise();
  }

  async getTransactionById(id: string){
    return await this.http.get<Transaction>('/api/transactions/' + id).toPromise();
  }

  async filterTransactionsByAccount(query: string) {
    return await this.http.get<Transaction[]>('/api/transactionsbyaccount', {
      params: {
        account: query
      }
    }
    ).toPromise();
  }

  async filterTransactionsByAmount(query: number) {
    return await this.http.get<Transaction[]>('/api/transactionsbyamount', {
      params: {
        amount: query
      }
    }
    ).toPromise();
  }

  async filterTransactionsByDate(query1: string, query2:string) {
    return await this.http.get<Transaction[]>('/api/transactionsbydate', {
      params: {
        datum1: query1,
        datum2: query2
      }
    }
    ).toPromise();
  }

  async createTransaction(transaction: Transaction) {
    return await this.http.post<Transaction>('/api/transactions', transaction).toPromise();
  }

  async deleteTransaction(id:String) {
    return await this.http.delete<Transaction>('/api/transactions/'+ id).toPromise();
  }
}
