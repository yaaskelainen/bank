import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  async getUsers(){
    return await this.http.get<User[]>('/api/users').toPromise();
  }

  async getUserById(id: string){
    return await this.http.get<User>('/api/users/' + id).toPromise();
  }

  async filterUsersBySzig(query: string) {
    return await this.http.get<User[]>('/api/usersbyszig', {
      params: {
        szig: query
      }
    }
    ).toPromise();
  }

  async filterUsersById(query: string) {
    return await this.http.get<User[]>('/api/usersbyid', {
      params: {
        searchid: query
      }
    }
    ).toPromise();
  }

  async filterUsersByName(query: string) {
    return await this.http.get<User[]>('/api/usersbyname', {
      params: {
        name: query
      }
    }
    ).toPromise();
  }

  async createUser(user: User) {
    return await this.http.post<User>('/api/users', user).toPromise();
  }

  async updateUser(user: User) {
    return await this.http.put<User>('/api/users', user).toPromise();
  }

  async deleteUser(id:String) {
    return await this.http.delete<User>('/api/users/'+ id).toPromise();
  }
}
