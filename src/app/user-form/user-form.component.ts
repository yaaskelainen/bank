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
    name: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z aáeéiíoóöőuúüűAÁEÉIÍOÓÖŐUÚÜŰ]*')]],
    adress: ['',  [Validators.required, Validators.minLength(3)]],
    phone: ['', Validators.pattern("[0-9]*")],
    szig: ['', [Validators.required, Validators.minLength(8)]],
    deleted:[]
  });

  changedUserForm?: FormGroup ;
  successMsg: string = '';
  errorMsg: string = '';
  users!: User[];
  selectedUser?: User;
  searchId!: string;
  searchName!: string;
  searchSzig!: string;
  

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
    this.changedUserForm=this.formBuilder.group({
      id: [this.selectedUser.id],
      name: [this.selectedUser.name, [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z aáeéiíoóöőuúüűAÁEÉIÍOÓÖŐUÚÜŰ]*')]],
      adress: [this.selectedUser.adress,  [Validators.required, Validators.minLength(3)]],
      phone: [this.selectedUser.phone, Validators.pattern("[0-9]*")],
      szig: [this.selectedUser.szig, [Validators.required, Validators.minLength(8)]],
      deleted:[this.selectedUser.deleted]
    })
  }

  

  async addUser() {
        const user = this.userForm.value;
    console.log(this.userForm.invalid)
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

    
    
   
    if(this.changedUserForm){
    
    const user = this.changedUserForm.value;

    
  

    try {
      const changedUser = await this.userService.updateUser(user);
      this.successMsg = 'Sikerült módosítani: ' + changedUser.id;
      this.ngOnInit();
    } catch (err: any) {
      this.errorMsg = err.error.message
    }
  }

   
  }

  async delete(id:string) {
    await this.userService.deleteUser(id);
    this.ngOnInit();
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
