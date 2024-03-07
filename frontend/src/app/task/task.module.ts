import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTaskComponent } from './new-task/new-task.component';
import { TaskRoutingModule } from './task-routing.module';
import { CurrentTaskComponent } from './current-task/current-task.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NewTaskComponent,
    CurrentTaskComponent,
  ],
  imports: [
    CommonModule, TaskRoutingModule, FormsModule
  ],
  exports: [CurrentTaskComponent, NewTaskComponent],
})
export class TaskModule { }
