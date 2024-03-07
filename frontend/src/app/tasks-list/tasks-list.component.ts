import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Task } from 'src/app/types/task';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {
  tasksList: Task[] = [];
  isLoading: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getTasks().subscribe({
      next: (tasks) => {
        this.tasksList = tasks;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.log(`Error: ${err}`)
      }
  });
}
}

