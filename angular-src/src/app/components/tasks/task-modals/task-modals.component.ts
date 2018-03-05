import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-task-modals',
  templateUrl: './task-modals.component.html',
  styleUrls: ['./task-modals.component.css']
})



export class TaskModalsComponent implements OnInit {
  taskSelected: Object;
  allTaskStatuses : Object[];
  @ViewChild("closeEditModal") closeEditModal : ElementRef;

  constructor(private taskService: TaskService) { 
    this.taskSelected = null;
  }

  ngOnInit() {
    this.getAllTaskStatuses();
    this.taskService.getSelectedTask().subscribe(
      (task) => {
        // Workaround for setting current status
        this.allTaskStatuses.forEach(taskStatus => {
          if(JSON.stringify(task.status)===JSON.stringify(taskStatus))
            task.status = taskStatus;
        });
        
        this.taskSelected = task;
        
      });
  }

  getAllTaskStatuses() {
		this.taskService.getAllStatuses().subscribe(res => {
      this.allTaskStatuses= res.statusArray;
		},
			err => {
				console.log(err);
				return false;
			});
  }
  updateTask() {
    console.log("Updating task: \n" + JSON.stringify(this.taskSelected,null, "\t"));
    this.taskService.saveOrUpdateTask(this.taskSelected).subscribe(res => {
      this.closeEditModal.nativeElement.click();
      console.log("SUCCESS updating task: ");
    }, err => {
      console.log('ERROR updating task: ' + err);
    });
    
  }
}
