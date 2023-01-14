import { Component, OnInit, ViewChild } from '@angular/core';
import { Todo } from 'src/app/model/todo';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  taskObj: Todo = new Todo();
  taskArr: Todo[] = [];
  addTaskData: string = '';
  editTaskData: string = '';
  constructor(private api: TaskService) { }

  ngOnInit(): void {
    this.addTaskData = '';
    this.editTaskData = '';
    this.taskObj = new Todo();
    this.taskArr = [];
    this.getAddedTask();
  }

  addTask() {
    this.taskObj.task = this.addTaskData;
    if (this.taskObj.task.length == 0) {
      alert('Enter your task')
    } else {
      this.api.addTask(this.taskObj).subscribe(res => {
        this.ngOnInit();
        this.addTaskData = '';
        this.editTaskData = '';
        
      }, error => {
        alert(error);
      });
    }


  }

  getAddedTask() {
    this.api.getAllTask().subscribe(result => {
      this.taskArr = result;
    });
  }

  editTask() {
    this.taskObj.task = this.editTaskData;
    this.api.editTask1(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.closebutton.nativeElement.click();
    }, error => {
      alert('Edit Failed')
    })
  }

  deleteTask(task: Todo) {
    this.api.delete(task).subscribe(res => {
      this.ngOnInit();
    }, error => {
      alert('Delete Failed')
    })
  }

  taskEdit(task: Todo) {
    this.taskObj = task;
    this.editTaskData = this.taskObj.task
  }

}
