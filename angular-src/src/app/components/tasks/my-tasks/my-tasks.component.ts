import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { TaskModalsComponent } from '../task-modals/task-modals.component';
import { Task } from '../../../models/task';
import { Status } from '../../../models/status';
import { ChartReadyEvent, ChartErrorEvent } from 'ng2-google-charts';

@Component({
	selector: 'app-my-tasks',
	templateUrl: './my-tasks.component.html',
	styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {

	@ViewChild('myTaskChart') myTaskChart;

	todaysDate: String = "";
	tasksDue: Task[];
	currentUser: Object;
	tasksList: Task[];
	taskStatusList: any[];
	count = 0;
	fridayOfTheWeek: Date;
	myTasksChartData: any;
	teamTasksChartData: any;

	constructor(
		private authService: AuthService,
		private taskService: TaskService,
		private router: Router,
		private flashMessagesService: FlashMessagesService) { }

	ngOnInit() {
		console.log("INIT OF MY-TASKS");
		var tmpDate = new Date();
		this.todaysDate = this.taskService.formatDate(tmpDate);
		var curr = new Date; // get current date
		var last = curr.getDate() - curr.getDay() + 5; // First day is the day of the month - the day of the week + 5 (for friday)
		this.fridayOfTheWeek = new Date(curr.setDate(last));

		// get tasks
		this.loadData();
	}

	loadData() {
		console.log("Getting all tasks.");
		// Get profile from service
		this.authService.getProfile().subscribe(profile => {
			this.currentUser = profile.user;
			this.taskService.getAllTasksByUsername(profile.user.username).subscribe(res => {
				console.log("Retrieved all tasks.");
				if (res.tasksList.length > 0) {
					console.log("LAST STEP setting all tasks.");
					this.tasksList = res.tasksList;
					this.tasksDue = this.getTasksDue(this.tasksList); // TODO: get today's due
					if (this.tasksDue)
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
		var tasksDue = [];
		var count = 0;


		taskList.forEach((task) => {
			if (new Date(task.dueDate) <= this.fridayOfTheWeek && task.status.statusCode !== 'CO') {
				tasksDue[count++] = task;
			}
		});
		return tasksDue;
	}

	formatDate(date) {
		return this.taskService.formatDate(date);
	}

	populateChartInfo() {
		if (this.tasksDue) {
			console.log("Tasks list was not null");
			this.myTasksChartData = {
				chartType: 'PieChart',
				dataTable: [
					['Status', 'Number'],
					['Not Started', this.tasksDue.filter(task => task.status.statusCode === 'NS').length],
					['In Progress', this.tasksDue.filter(task => task.status.statusCode === 'IP').length],
					['Completed', this.tasksDue.filter(task => task.status.statusCode === 'CO').length]
				],
				options: {
					'title': 'My Task Progress',
					'backgroundColor': '#303030',
					'titleTextStyle': { color: "#0ce3ac" },
					'legend': {
						textStyle: {
							color: '#FFFFFF'
						},
					},
					'chartArea': { 'width': '100%', 'height': '75%' },
					'width': 500,
					'height': 300
				},
			};
		}
		else { console.log("Tasks list was null"); }

		this.teamTasksChartData = {
			chartType: 'ColumnChart',
			dataTable: [
				['Name', 'Remaining', 'Completed'],
				['Troy', 5, 10],
				['John', 2, 4]
			],
			options: {
				title: 'My Team Tasks Progress',
				backgroundColor: '#303030',
				titleTextStyle: { color: "#0ce3ac" },
				legend: {
					textStyle: { color: '#FFFFFF' },
					position: 'bottom'
				},
				textStyle: { color: '#FFFFFF' },
				animation: {
					duration: 1000,
					easing: 'out',
					startup: true
				},
				hAxis: {
					textStyle: { color: '#FFFFFF' }
				},
				vAxis: {
					textStyle: { color: '#FFFFFF' }
				},
				chartArea: { 'width': '75%', 'height': '65%' },
				width: 500,
				height: 300
			}
		};
	}
	public testReady(event: ChartReadyEvent) {
		console.log("CHART IS READY!!");
	}

	public testError(event: ChartErrorEvent) {
		console.log("CHART HAD AN ERROR!!");
	}

}
