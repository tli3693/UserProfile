import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http:Http) { 

  }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // Calls back-end webservice post request to register user
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // Calls back-end webservice post request to authenticate user
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
      .map(res => res.json());

  }

  storeUserData(token, user) {
    console.log("Storing user data");
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = user;

  }
  
  testAuthMethod() {
    return "HELLO?";
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getProfile() {
    this.loadToken();

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    // Calls back-end webservice get request to get profile
    // Need token

    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
      .map(res => res.json());
  }

  // Loads token from local storage
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;

  }

  // Angular2 JWT to check if token not expired (logged in or not)
  loggedIn() {
    return tokenNotExpired('id_token');
  }
}
