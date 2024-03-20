import { Component, Input } from '@angular/core';
import { Task } from '../types/task';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private apiService: ApiService,
     private activatedRout: ActivatedRoute,
     private router: Router,
     ) {}

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

  editTaskStatus(taskId: string, status: string): void {
      if (status === "toDo") {
        status = "inProgress";
      }else if (status === "inProgress") {
        status = "codeReview";
      }else if (status === "codeReview") {
        status = "done";
      }
    this.apiService.editTaskStatus(taskId, status).subscribe();
    this.router.navigateByUrl("/", {skipLocationChange: true}).then((navigated) => {
      navigated ? this.router.navigate([`/tasks`]) : null;
    });
  }

  deleteTask(taskId: string): void {
    this.apiService.deleteTask(taskId);
    this.router.navigateByUrl("/", {skipLocationChange: true}).then((navigated) => {
      navigated ? this.router.navigate([`/tasks`]) : null;
    });
  }
}
