import { Component, Input, OnInit } from '@angular/core';
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
    name: ['', Validators.required],
    adress: ['', Validators.required],
    phone: ['', Validators.minLength(8)],
    szig: ['', Validators.minLength(8)],
    deleted:[]
  });

  successMsg: string = '';
  errorMsg: string = '';
  @Input()
  users: User[] = [];
  selectedUser?: User;
  

  constructor(private userService: UserService,
    private formBuilder: FormBuilder, private router: Router) { }

  async ngOnInit(): Promise<void> {
     this.users = await this.userService.getUsers();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  async onSelect(user: User): Promise<void> {
    this.selectedUser = user;
  }

  

  async addUser() {
    const user = this.userForm.value;
    user.deleted = false;
    try {
      const newUser = await this.userService.createUser(user);
      this.successMsg = 'Sikerült új felhasználót rögzíteni, száma: ' + newUser.id;
      this.ngOnInit();
    } catch (err: any) {
      this.errorMsg = err.rerror.message
    }
  }
  
  async changeUser() {
    
    const user = this.userForm.value;
    user.id = this.selectedUser?.id;
    if(user.name==''){
      user.name=this.selectedUser?.name;
    }
    if(user.szig==''){
      user.szig=this.selectedUser?.szig;
    }
    if(user.deleted==null){
      user.deleted=this.selectedUser?.deleted;
    }

    try {
      const changedUser = await this.userService.updateUser(user);
      this.successMsg = 'Sikerült módosítani: ' + changedUser.id;
      this.ngOnInit();
    } catch (err: any) {
      this.errorMsg = err.error.message
    }
  }

  async delete(id:string) {
    await this.userService.deleteUser(id);
    this.ngOnInit();
  }

  
}
