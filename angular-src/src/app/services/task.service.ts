import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

const rootContextPath = "http://localhost:3000";

@Injectable()
export class TaskService {


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

}
