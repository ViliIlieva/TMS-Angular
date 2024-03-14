import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Task } from 'src/app/types/task';
import { Comment } from 'src/app/types/comment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  //TASKS
  getTasks() {
    const { apiUrl } = environment;
    return this.http.get<Task[]>(`${apiUrl}/tasks`);
  }

  getTask(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Task>(`${apiUrl}/tasks/${id}`);
  }

  createTask(
    taskName: string,
    taskText: string,
    status: string,
    taskType: string,
  ) {
    const { apiUrl } = environment;
    return this.http.post<Task>(`${apiUrl}/tasks`, {
      taskName,
      taskText,
      status,
      taskType,
    });
  }

  editTaskStatus(taskId: string, status: string){
    console.log(taskId, status)
    const { apiUrl } = environment;
    return this.http
    .put<Task>('/api/tasks', {taskId, status});
  }

  //COMMENTS
  getComments() {
    const { apiUrl } = environment;
    return this.http.get<Comment[]>(`${apiUrl}/comments`);
  }
}
