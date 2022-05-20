import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup = this.formBuilder.group({
    id: [],
    firstName: [''],
    lastName: [''],
    age: [18, Validators.min(18)]
  });

  successMsg: string = '';
  errorMsg: string = '';
  users: User[] = []

  constructor(private userService: UserService,
    private formBuilder: FormBuilder) { }

  async ngOnInit(): Promise<void> {
     this.users = await this.userService.getUsers();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  async addUser() {
    const user = this.userForm.value;
    try {
      const newUser = await this.userService.createUser(user);
      this.successMsg = 'Success: ' + newUser.id;
    } catch (err: any) {
      this.errorMsg = err.rerror.message
    }
  }

}
