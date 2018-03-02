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
	tasksDue: Object[];
	currentUser: Object;
	tasksList: Object[];
	taskStatusList: any[];
	count = 0;

	constructor(
		private authService: AuthService,
		private taskService: TaskService,
		private router: Router,
		private flashMessagesService: FlashMessagesService) { }

	ngOnInit() {
		var tmpDate = new Date();
		this.todaysDate = this.formatDate(tmpDate);

		// Get profile from service
		this.authService.getProfile().subscribe(profile => {
			this.currentUser = profile.user;

			this.taskService.getAllTasksByUsername(profile.user.username).subscribe(res => {
				if (res.tasksList) {
					res.tasksList.forEach(function(task) {
						console.log('\nThe Task is %s', JSON.stringify(task, null, "\t"));
					})
					this.tasksList = res.tasksList;
					this.tasksDue = this.getTasksDue(this.tasksList); // TODO: get today's due

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

	editTask(task) {
		console.log("Editing task: " + task.name);
	}

	completeTask(task) {
		console.log("Completing task: " + task.name);
	}

	deleteTask(task) {
		console.log("Deleting task: " + task.name);
	}

	getTasksDue(taskList) {

		var tasksDue = [taskList.length];
		var count = 0;
		taskList.forEach((task) => {
			if(new Date(task.dueDate) <= new Date() && task.status.statusCode !== 'CO') {
				tasksDue[count++] = task;
			}
		});
		return tasksDue;
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
