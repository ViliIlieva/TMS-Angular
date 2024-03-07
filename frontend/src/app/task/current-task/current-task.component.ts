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
    const id = this.activatedRout.snapshot.params['taskId'];

    this.apiService.getTask(id).subscribe((task) => {
      this.task = task;
    });
  }

  fetchComments(): void {
    const id = this.activatedRout.snapshot.params['taskId'];

    this.apiService.getComments().subscribe((comments) => {
      this.commentsList = comments;
      this.commentsByTaskId = this.commentsList.filter(
        (comment) => comment._taskId === id,
      );
      if (this.commentsByTaskId.length === 0) {
        this.thereAreNoComments = true;
      }
    });
  }

  addComment(form: NgForm): void {
    const id = this.activatedRout.snapshot.params['taskId'];
    // this.userService.register();
    this.router.navigate(['/my-tasks']);
  }
}
