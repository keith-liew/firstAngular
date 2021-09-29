import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addUserForm: FormGroup = new FormGroup({});

  email = new FormControl('', [Validators.required, Validators.email]);


  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      'name': new FormControl(''),
      'email': new FormControl(''),
      'gender': new FormControl(''),
      'status': new FormControl('')
    });
  }
  
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  createUser() {
    console.log(this.addUserForm.value);
    this.userService.addUser(this.addUserForm.value).subscribe( data=> {
      console.log('User: '+ this.addUserForm.value.name + ' is created');
      alert('Name: '+ this.addUserForm.value.name + ' is created')
    }, err => {
      console.warn(err);
      alert("Error code:"+err.status+"\nCode Name: "+ err.statusText +"\nMessage: " + err.error.data[0].field + " " + err.error.data[0].message);
    });
  }

}
