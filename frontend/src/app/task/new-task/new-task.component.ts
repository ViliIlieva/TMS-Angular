import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent {
  constructor(
    private apiService: ApiService,
    private activatedRout: ActivatedRoute,
    private userService: UserService,
    private router: Router,
  ) {}

  addTask(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const { taskName, taskText, taskType } = form.value;
    const status = 'toDo';
    const _userId = this.userService.user?._id;
    
    this.apiService
      .createTask(taskName, taskText, status, taskType, _userId)
      .subscribe(() => {
        this.router.navigate(['/tasks']);
      });
  }
}
