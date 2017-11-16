import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user : Object;
  
  constructor(private authService: AuthService, 
    private router: Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      console.log("Got profile: " + profile.user);
      this.user = profile.user;
    }, 
    err => {
      console.log(err);
      return false;
    });

  }

}
