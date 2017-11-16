import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  todaysDate : String = "";
  numDueToday : Number = 3;

  constructor() { }

  ngOnInit() {
    var tmpDate = new Date();
    console.log(tmpDate);
    this.todaysDate = (tmpDate.getMonth() + 1) + '/' + tmpDate.getDate() + '/' +  tmpDate.getFullYear();
    console.log(this.todaysDate);
  }

}
