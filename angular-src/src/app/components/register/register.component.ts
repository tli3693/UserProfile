import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';

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
    "errorMessage": ""
  }
  // Inject services into constructor
  constructor(private validateService: ValidateService, private flashMessagesService: FlashMessagesService) { 
    this.input.errorMessage = "TESTING";
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
      if(!this.validateService.validateEmail(user.email)) {
        //this.flashMessagesService.show("Enter a valid email.", {cssClass: 'alert-danger', timeout: 3000});
        this.input.error = true;
        this.input.errorMessage = "Enter a valid email.";
        console.log("Enter a valid email.");
        return false;
      }
    }
    this.flashMessagesService.show("SUCCESSFUL REGISTER");
    console.log("Successful register!");
    
    return true;

    
  }

}
