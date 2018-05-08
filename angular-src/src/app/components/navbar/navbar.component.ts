import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {

  public currentUser: Object;

  constructor(private authService:AuthService,
    private router:Router,
    private flashMessagesService:FlashMessagesService) { 
      this.currentUser = this.authService.userChange.subscribe((value) => { 
        this.currentUser = value; 
      });
    }

  ngOnInit() {
    if(localStorage.getItem('user')) {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
    }
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessagesService.show('You are now logged out', {cssClass: 'alert-success', timeout:4000});

    this.router.navigate(['/login']);
    return false;
  }

}
