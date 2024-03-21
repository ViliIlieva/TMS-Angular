import { Component, OnInit, ViewChild } from '@angular/core';
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
  isEditMode: boolean = false;
  task: Task | undefined;
  commentsList: Comment[] = [];
  commentsByTaskId: Comment[] = [];
  thereAreNoComments: boolean = false;
  comentDetails: Comment | undefined;


  constructor(
    private apiService: ApiService,
    private activatedRout: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  @ViewChild('form')
  form!: NgForm;

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  ngOnInit(): void {
    this.fetchTask();
    this.fetchComments();
  }

  toggleEditMode(_id: string): void {
    this.isEditMode = !this.isEditMode;

    this.apiService.getComment(_id).subscribe((comment) => {
      this.comentDetails = comment;
    });
  }

  fetchTask(): void {
    const _id = this.activatedRout.snapshot.params['taskId'];
    
    this.apiService.getTask(_id).subscribe((task) => {
      this.task = task;
    });
  }

  async fetchComments(): Promise<void> {
    const _id = this.activatedRout.snapshot.params['taskId'];

    this.apiService.getComments().subscribe((comments) => {
      this.commentsList = comments;
      this.commentsByTaskId = this.commentsList.filter(
        (comment) => comment._taskId === _id
      );
      if (this.commentsByTaskId.length === 0) {
        this.thereAreNoComments = true;
      }
    });
  }

  // TASKS
 deleteTask(): void {
    const _id = this.activatedRout.snapshot.params['taskId'];
    this.apiService.deleteTask(_id);
    this.deleteManyComments();
    this.router.navigate([`/my-tasks`]);
  }


  //COMMENTS
 addComment(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const _taskId = this.activatedRout.snapshot.params['taskId'];
    const _userId = this.userService.user?._id;
    const {text, commentType } = form.value;

     this.apiService
     .addComment(commentType, text, _taskId, _userId).subscribe();
     this.router.navigateByUrl("/", {skipLocationChange: true}).then((navigated) => {
      navigated ? this.router.navigate([`/my-tasks/${_taskId}`]) : null;
    });
  }

  editCommentText(form: NgForm, _id: string): void {
    if (form.invalid) {
      return;
    }
      const commentId = this.comentDetails!._id;
      const {text} = { ...form.value } as Comment;
   
      this.apiService.editCommentText(commentId, text).subscribe(() => {
      this.toggleEditMode(commentId);
    });
    this.router.navigateByUrl("/", {skipLocationChange: true}).then((navigated) => {
      navigated ? this.router.navigate([`/my-tasks/${this.comentDetails!._taskId}`]) : null;
    });
  }

  deleteComment(id: string): void {
    const _taskId = this.activatedRout.snapshot.params['taskId'];
    
    this.apiService.deleteComment(id);
    this.router.navigateByUrl("/", {skipLocationChange: true}).then((navigated) => {
      navigated ? this.router.navigate([`/my-tasks/${_taskId}`]) : null;
    });
  }

  deleteManyComments(): void {
    this.commentsByTaskId.forEach((comment) => {
      this.deleteComment(comment._id);
    })
  }
}
