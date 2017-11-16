import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  todaysDate: String = "";
  numDueToday: Number = 3;
  currentUser: Object;
  tasksList : Object[];
  
  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private router: Router,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    var tmpDate = new Date();
    console.log(tmpDate);
    this.todaysDate = (tmpDate.getMonth() + 1) + '/' + tmpDate.getDate() + '/' + tmpDate.getFullYear();
    console.log(this.todaysDate);
    this.authService.getProfile().subscribe(profile => {
      console.log("Got profile: " + profile.user.username);
      this.currentUser = profile.user;
      
      this.taskService.getAllTasksByUsername(profile.user.username).subscribe(res => {
        console.log(res);
        if(res.tasksList) {
          this.tasksList = res.tasksList;
          console.log(this.tasksList);
        }

      },
      err => {
        console.log(err);
        return false;
      });
    }, 
    err => {
      console.log(err);
      return false;
    });
    
  }

}
