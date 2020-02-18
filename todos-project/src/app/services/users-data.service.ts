import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  usersDataUrl = 'https://jsonplaceholder.typicode.com/users';
  usersTodosDataUrl = 'https://jsonplaceholder.typicode.com/todos';
   proxyurl = 'https://cors-anywhere.herokuapp.com/';

  constructor(private httpClient: HttpClient) { }
  headerOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getUsers() {
    return this.httpClient.get( this.usersDataUrl, this.headerOptions);
  }

  getUserTodosById(userID) {
    return this.httpClient.get(this.usersTodosDataUrl + '?userId=' + userID, this.headerOptions);

  }


}
