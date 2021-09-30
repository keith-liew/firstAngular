import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userId: any;
  userDetails: any;
  editUserForm: FormGroup = new FormGroup({});


  email = new FormControl('', [Validators.required, Validators.email]);
  dataLoaded:boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.activatedRoute.params.subscribe( data=>{
      this.userId = data.id;
    })

    if(this.userId !==''){
      this.userService.viewUser(this.userId)
      .toPromise().then(data=>{
        this.userDetails = data;
        Object.assign(this.userDetails,data);
        console.warn(this.userDetails);

        //build a form
        this.editUserForm = this.formBuilder.group({
          'name' : new FormControl(this.userDetails.data.name),
          'email': new FormControl(this.userDetails.data.email),
          'gender': new FormControl(this.userDetails.data.gender),
          'status': new FormControl(this.userDetails.data.status)
        })
        this.dataLoaded = true;
      })
      .catch(err =>{
        alert("Error code:"+err.status+"\nCode Name: "+ err.statusText +"\nMessage: " + err.error.data[0].field + " " + err.error.data[0].message);
      })
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


  updateUser(){
    this.userService.editUser(this.userId, this.editUserForm.value).subscribe( data=> {
      console.log('User: '+ this.editUserForm.value.name + ' is motified');
      alert('Name: '+ this.editUserForm.value.name + ' is motified')
    }, err => {
      console.warn(err);
      alert("Error code:"+err.status+"\nCode Name: "+ err.statusText +"\nMessage: " + err.error.data[0].field + " " + err.error.data[0].message);
    });
  }

}
