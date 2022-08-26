import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) { }
  getUser(): Observable<any> {
    return this.http.get("https://jsonplaceholder.typicode.com/todos")
  }
  createUser(value: any): Observable<any> {
    return this.http.post("https://jsonplaceholder.typicode.com/todos", value)
  }
  deleteUser(id: number) {
    return this.http.delete("https://jsonplaceholder.typicode.com/todos/" + id);
  }
// [For Update Api
  readUserDetails(id: number) {
    return this.http.get("https://jsonplaceholder.typicode.com/todos/" + id)
  }
  updateUser(value: any, id: number,) {
    return this.http.put("https://jsonplaceholder.typicode.com/todos/" + id, value)
  }
// ]
}

