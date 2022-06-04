import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
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

  constructor(private router: Router, private userService: UserService) { }

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
    this.ngOnInit();
  }

  }
