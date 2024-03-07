import { Component } from '@angular/core';
import { Task } from '../types/task';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.scss'],
})
export class AllTasksComponent {
  allTasks: Task[] = [];
  toDoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  codeReviewTasks: Task[] = [];
  doneTasks: Task[] = [];

  isLoading: boolean = true;
  isSubscribe = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getTasks().subscribe({
      next: (tasks) => {
        this.allTasks = tasks;
        this.isLoading = false;
        this.toDoTasks = tasks.filter((task)=> task.status === 'toDo');
        this.inProgressTasks = tasks.filter((task)=> task.status === 'inProgress');
        this.codeReviewTasks = tasks.filter((task)=> task.status === 'codeReview');
        this.doneTasks = tasks.filter((task)=> task.status === 'done');
        
        // console.log(tasks);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(`Error: ${err}`);
      },
    });
  }
}
