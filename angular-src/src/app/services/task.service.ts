import { Component, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

const rootContextPath = "http://localhost:3000";

@Injectable()
export class TaskService {

  @Output() fire: EventEmitter<any> = new EventEmitter();

  constructor(private http: Http) { }

  getAllTasksByUsername(username) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log("In task.service.getAllTasksByUsername(username) function with username: " + username);
    return this.http.post(rootContextPath + '/tasks/findAllTasks', { username: username }, { headers: headers })
      .map(res => res.json());
  }

  getAllStatuses() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log("In task.service.getTaskStatus(statusCode) function");
    return this.http.get(rootContextPath + '/tasks/getAllTaskStatuses', { headers: headers })
      .map(res => res.json());
  }

  
  selectTask(task) {
    console.log('Selection started');
    this.fire.emit(task);
  }

  getSelectedTask() {
    return this.fire;
  }

  formatDate(date) {
		var tmpDate = new Date(date);
		return (tmpDate.getMonth() + 1) + '/' + tmpDate.getDate() + '/' + tmpDate.getFullYear();
	}
}
