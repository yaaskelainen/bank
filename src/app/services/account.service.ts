import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  async getAccounts(){
    return await this.http.get<Account[]>('/api/accounts').toPromise();
  }

  async getAccountById(id: string){
    return await this.http.get<Account>('/api/accounts/' + id).toPromise();
  }

  async filterAccountsByUser(query: string) {
    return await this.http.get<Account[]>('/api/accountsbyuser', {
      params: {
        userid: query
      }
    }
    ).toPromise();
  }

  async createAccount(account: Account) {
    return await this.http.post<Account>('/api/accounts', account).toPromise();
  }

  async updateAccount(account: Account) {
    return await this.http.put<Account>('/api/accounts', account).toPromise();
  }

  async deleteAccount(id:String) {
    return await this.http.delete<Account>('/api/accounts/'+ id).toPromise();
  }
}
