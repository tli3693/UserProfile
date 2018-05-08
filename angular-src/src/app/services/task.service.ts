import { Component, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { AuthService } from './auth.service';

const rootContextPath = "http://localhost:3000";

@Injectable()
export class TaskService {

  @Output() fire: EventEmitter<any> = new EventEmitter();
  authToken: any;

  constructor(private http: Http, private authService: AuthService) { }

  getAllTasksByUsername(username) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(rootContextPath + '/tasks/findAllTasks', { username: username }, { headers: headers })
      .map(res => res.json());
  }

  getAllStatuses() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get(rootContextPath + '/tasks/getAllTaskStatuses', { headers: headers })
      .map(res => res.json());
  }

  // Passes task to modal
  selectTask(task) {
    this.fire.emit(task);
  }

  getSelectedTask() {
    return this.fire;
  }

  formatDate(date) {
    var tmpDate = new Date(date);
    return (tmpDate.getMonth() + 1) + '/' + tmpDate.getDate() + '/' + tmpDate.getFullYear();
  }

  saveOrUpdateTask(task) {
    this.authService.loadToken();

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.authToken);

    return this.http.post(rootContextPath + '/tasks/update', { "task": task }, { headers: headers })
      .map(res => res.json());
  }
}
