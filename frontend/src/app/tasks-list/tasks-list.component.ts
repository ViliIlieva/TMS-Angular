import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Task } from 'src/app/types/task';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {
  tasksList: Task[] = [];
  tasksByUserId: Task[] = [];
  thereAreNoTasks: boolean = false;
  isLoading: boolean = true;

  constructor(private apiService: ApiService, private userService: UserService) {}

  ngOnInit(): void {
    const userId = this.userService.user!._id;

    this.apiService.getTasks().subscribe({
      next: (tasks) => {
        this.tasksList = tasks;
        this.tasksByUserId = this.tasksList.filter(
          (task) => task._userId === userId
        );
        console.log(this.tasksList);
        console.log(this.tasksByUserId);
        if (this.tasksByUserId.length === 0) {
          this.thereAreNoTasks = true;
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.log(`Error: ${err}`)
      }
  });
}
}

