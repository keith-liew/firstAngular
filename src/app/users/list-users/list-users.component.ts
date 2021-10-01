import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

export interface User {
  name: string;
  id: number;
  email: string;
  gender: string;
  status: string;

}

const ELEMENT_DATA: User[] = [];


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'gender', 'status', 'actions'];
  dataSource = ELEMENT_DATA;


  data: User[] = [];
  meta: any = [];
  retdata: any = [this.meta, this.data];
  pagination: any = [];
  pages: any = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.listUsers().subscribe(data => {
      //this.data = data;
      this.retdata = data;
      this.pagination = this.retdata.meta.pagination;



      for (var i = 1; i <= this.pagination.pages; i++) {
        this.pages.push(i);
      }

      console.warn(this.retdata);
    });

  }

  someMethod(num: any) {
    this.userService.listUsersPage(num).subscribe(data => {
      //this.data = data;
      this.retdata = data;
      this.pagination = this.retdata.meta.pagination;



      for (var i = 1; i <= this.pagination.pages; i++) {
        this.pages.push(i);
      }
      console.log("some method work");
      console.log(this.retdata);
    });

  };

  onClickSubmit(data:any) {
    console.log("Selected Email id : " + data.email);
    this.userService.listUsersEmail(data.email).subscribe(data => {
      //this.data = data;
      this.retdata = data;
      this.pagination = this.retdata.meta.pagination;

      for (var i = 1; i <= this.pagination.pages; i++) {
        this.pages.push(i);
      }
      console.log("some method work");
      console.log(this.retdata);
    }, err => {
      console.log(err);
      alert("Error code:"+err.status+"\nCode Name: "+ err.statusText +"\nMessage: " + err.error.data[0].field + " " + err.error.data[0].message);
    });
 }

}
