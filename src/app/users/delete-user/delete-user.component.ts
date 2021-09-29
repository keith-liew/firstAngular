import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  userId : string = '';

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data =>{
      this.userId = data.id;
    });

    if (this.userId){
      this.userService.deleteUser(this.userId).subscribe(data =>{
        alert("The user with the ID: "+ this.userId+" is deleted successfully");
      }, err=>{
        alert("Error code:"+err.status+"\nCode Name: "+ err.statusText +"\nMessage: " + err.error.data[0].field + " " + err.error.data[0].message);
      }
      );
    }
  }

}
