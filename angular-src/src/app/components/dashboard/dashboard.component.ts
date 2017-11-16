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
  numDueToday: Number = 0;
  currentUser: Object;
  tasksList: Object[];
  taskStatusList: [{ statusCode: string, status: string }];

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private router: Router,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    var tmpDate = new Date();
    console.log(tmpDate);
    this.todaysDate = this.formatDate(tmpDate);
    console.log(this.todaysDate);
    this.authService.getProfile().subscribe(profile => {
      console.log("Got profile: " + profile.user.username);
      this.currentUser = profile.user;

      this.taskService.getAllTasksByUsername(profile.user.username).subscribe(res => {
        console.log(res);
        if (res.tasksList) {
          this.tasksList = res.tasksList;
          this.numDueToday = this.tasksList.length; // TODO: get today's due
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
    this.getAllTaskStatuses();
  }

  formatDate(date) {
    var tmpDate = new Date(date);
    return (tmpDate.getMonth() + 1) + '/' + tmpDate.getDate() + '/' + tmpDate.getFullYear();
  }

  getAllTaskStatuses() {
    this.taskService.getAllStatuses().subscribe(res => {
      this.taskStatusList = res.statusArray;
    },
      err => {
        console.log(err);
        return false;
      });
  }

  getTaskStatusByCode(code) {
    var returnStatus = "N/A";
    
    if (!this.taskStatusList) {
      this.getAllTaskStatuses();
    }
    this.taskStatusList.forEach(function (item, index, array) {
      if (item.statusCode === code) {
        returnStatus = item.status;
      }
    });
    return returnStatus;
  }

}
