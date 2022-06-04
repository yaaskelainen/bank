import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';


import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { AccountListComponent } from './account-list/account-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
     path: 'account-list',
     component: AccountListComponent
   },
  // {
  //   path: 'product-form',
  //   component: ProductFormComponent
  // },
  {
    path: 'user-form',
    component: UserFormComponent
  },
  // {
  //   path: 'category-form',
  //   component: CategoryFormComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
