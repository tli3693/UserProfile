import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  errorMessage: String;
  input = {
    "error": false,
    "errorMessage": null
  }

  constructor(private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService ) { }

  ngOnInit() { }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password,
    }
    console.log("Attempting to login as: " + user.username);
    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        console.log(data);
        this.authService.storeUserData(data.token, data.user);
        this.flashMessagesService.show('You are now logged in as ' + user.username, { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['dashboard']);
      } else {
        this.flashMessagesService
          .show(data.msg, { cssClass: 'alert-danger', timeout: 5000 });
        this.router.navigate(['login']);
      }
    });
  }

}
