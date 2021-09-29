import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsersComponent } from './list-users/list-users.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { EditUserComponent } from './edit-user/edit-user.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    ListUsersComponent,
    ViewUserComponent,
    DeleteUserComponent,
    AddUserComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    RouterModule,
    MatCardModule,
  ]
})
export class UsersModule { }
