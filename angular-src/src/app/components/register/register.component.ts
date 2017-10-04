import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  errorMessage: String;
  input = {
    "error": false,
    "errorMessage": null
  }
  // Inject services into constructor
  constructor(
    private validateService: ValidateService, 
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { 
    
  }

  ngOnInit() {

  }

  // Applied to submit function on form
  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
     
    }
    
    // Required Fields
    if(!this.validateService.validateRegister(user)) {
      //this.flashMessagesService.show("Not a valid input. Please input all fields.", {cssClass: 'alert-danger', timeout: 3000});
      this.input.error = true;
      this.input.errorMessage = "Not a valid input. Please input all fields.";

      console.log("Not a valid input. Please input all fields");
      return false;
    } else {
      // Validate E-mail Address
      if(!this.validateService.validateEmail(user.email)) {
        //this.flashMessagesService.show("Enter a valid email.", {cssClass: 'alert-danger', timeout: 3000});
        this.input.error = true;
        this.input.errorMessage = "Enter a valid email.";
        console.log("Enter a valid email.");
        return false;
      }
    }

    // Register User
    console.log("Attempting to register user.");
    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.input.error = false;
        this.input.errorMessage = "";
        this.flashMessagesService.show("Thank you for registering. You may now login.", {cssClass: 'alert-success', timeout: 3000});
        console.log("Successful register!");
        this.router.navigate(['/login']);
      } else {
        this.input.error = true;
        this.input.errorMessage = "Something went wrong.";
        //this.flashMessagesService.show("Something went wrong.", {cssClass: 'alert-success', timeout: 3000});
        console.log("ERROR?");
      }
    });
    
  }

}
