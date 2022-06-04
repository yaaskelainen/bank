import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users!: User[];
  searchId!: string;
  searchName!: string;
  searchSzig!: string;

  constructor(private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    this.users = await this.userService.getUsers();
  }

  async getById() {
    this.users[0] = await this.userService.getUserById(this.searchId);
  }

  async searchBySzig() {
    this.users = await this.userService.filterUsersBySzig(this.searchSzig);
  }

  async searchById() {
    this.users = await this.userService.filterUsersById(this.searchId);
  }

  async searchByName() {
    this.users = await this.userService.filterUsersByName(this.searchName);
  }

}
