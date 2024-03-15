import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Comment } from 'src/app/types/comment';
import { Task } from 'src/app/types/task';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-current-task',
  templateUrl: './current-task.component.html',
  styleUrls: ['./current-task.component.scss'],
})
export class CurrentTaskComponent implements OnInit {
  task: Task | undefined;
  commentsList: Comment[] = [];
  commentsByTaskId: Comment[] = [];
  thereAreNoComments: boolean = false;

  constructor(
    private apiService: ApiService,
    private activatedRout: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  ngOnInit(): void {
    this.fetchTask();
    this.fetchComments();
  }

  fetchTask(): void {
    const _id = this.activatedRout.snapshot.params['taskId'];

    this.apiService.getTask(_id).subscribe((task) => {
      this.task = task;
    });
  }

  fetchComments(): void {
    const _id = this.activatedRout.snapshot.params['taskId'];

    this.apiService.getComments().subscribe((comments) => {
      this.commentsList = comments;
      this.commentsByTaskId = this.commentsList.filter(
        (comment) => comment._taskId === _id,
      );
      if (this.commentsByTaskId.length === 0) {
        this.thereAreNoComments = true;
      }
    });
  }

  addComment(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const _taskId = this.activatedRout.snapshot.params['taskId'];
    const {text, commentType } = form.value;
    const _userId = this.userService.user?._id;

     this.apiService
     .addComment(_taskId, text, commentType, _userId);
    this.router.navigate([`/my-tasks/${_taskId}`]);
  }
}
