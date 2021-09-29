import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //https://jsonplaceholder.typicode.com/
  baseUrl: String = 'https://gorest.co.in/public/v1/';
  TOKEN: String = 'e807a4c5db1d88029d8d4379db80f3ef8783f402cd841f948563381623245720'

  //todos
  constructor(private http: HttpClient) { }

  listUsers(){
    return this.http.get(this.baseUrl+ 'users?access-token=${TOKEN}');
  }

  viewUser(id : String){
    return this.http.get(this.baseUrl+ 'users/'+ id +'?access-token=${TOKEN}');
  }
}
