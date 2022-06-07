import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserFormComponent } from './user-form/user-form.component';

import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user-list/user/user.component';
import { AccountListComponent } from './account-list/account-list.component';
import { NewaccountFormComponent } from './user-list/user/newaccount-form/newaccount-form.component';
import { AccountbalanceFormComponent } from './account-list/accountbalance-form/accountbalance-form.component';
import { AccounttransferFormComponent } from './account-list/accounttransfer-form/accounttransfer-form.component';

@NgModule({
  declarations: [
    AppComponent,
    // ProductListComponent,
    // ShoppingCartComponent,
    // ProductComponent,
    // CartItemComponent,
    // ProductFormComponent,
    UserFormComponent,
    // CategoryFormComponent,
    UserListComponent,
    UserComponent,
    AccountListComponent,
    NewaccountFormComponent,
    AccountbalanceFormComponent,
    AccounttransferFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
