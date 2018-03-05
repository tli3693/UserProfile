import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { TaskModalsComponent } from '../task-modals/task-modals.component';
import { Task } from '../../../models/task';
import { Status } from '../../../models/status';

@Component({
	selector: 'app-my-tasks',
	templateUrl: './my-tasks.component.html',
	styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {

	// pie-chart
	public percent: number = 80;
	public options: any = [];

	todaysDate: String = "";
	tasksDue: Object[];
	currentUser: Object;
	tasksList: Task[];
	taskStatusList: any[];
	count = 0;

	constructor(
		private authService: AuthService,
		private taskService: TaskService,
		private router: Router,
		private flashMessagesService: FlashMessagesService) { }

	ngOnInit() {
		var tmpDate = new Date();
		this.todaysDate = this.taskService.formatDate(tmpDate);

		// Get profile from service
		this.authService.getProfile().subscribe(profile => {
			this.currentUser = profile.user;

			this.taskService.getAllTasksByUsername(profile.user.username).subscribe(res => {
				if (res.tasksList.length > 0) {
					this.tasksList = res.tasksList;
					this.tasksDue = this.getTasksDue(this.tasksList); // TODO: get today's due
					this.populateChartInfo();
				}
			}, err => {
				console.log(err);
				return false;
			});
		}, err => {
			console.log(err);
			return false;
		});



	}

	editTask(task) {
		this.taskService.selectTask(task);
		console.log("Editing task: " + task.name);
	}

	completeTask(task) {
		console.log("Completing task: " + task.name);
	}

	deleteTask(task) {
		console.log("Deleting task: " + task.name);
	}

	openModal(modalId, task) {
		console.log("Opening modal " + modalId + " for task: " + task.name);
	}

	getTasksDue(taskList) {
		var tasksDue = [taskList.length];
		var count = 0;
		taskList.forEach((task) => {
			if (new Date(task.dueDate) <= new Date() && task.status.statusCode !== 'CO') {
				tasksDue[count++] = task;
			}
		});

		return tasksDue;
	}

	formatDate(date) {
		return this.taskService.formatDate(date);
	}

	populateChartInfo() {
		if (this.tasksList) {
			this.pie_ChartData = [
				['Status', 'Number'],
				['Not Started', this.tasksList.filter(task => task.status.statusCode === 'NS').length],
				['In Progress', this.tasksList.filter(task => task.status.statusCode === 'IP').length],
				['Completed', this.tasksList.filter(task => task.status.statusCode === 'CO').length]
			];
		} else
			console.log("Tasks list was null");
	}

	public pie_ChartData = [];

	public pie_ChartOptions = {
		title: 'My Task Progress',
		backgroundColor: '#002b36',
		titleTextStyle: { color: "#0ce3ac" },
		legend: {
			textStyle: {
				color: '#FFFFFF'
			}
		},
		width: 500,
		height: 300
	};

}
