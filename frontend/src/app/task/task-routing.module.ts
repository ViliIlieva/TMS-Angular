import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTasksComponent } from '../user-tasks/user-tasks.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { AuthActivate } from '../core/guards/auth.activate';
import { AllTasksComponent } from '../all-tasks/all-tasks.component';
import { CurrentTaskComponent } from './current-task/current-task.component';

const routes: Routes = [
  {
    path: 'my-tasks',
    children: [
        {
            path: '',
            pathMatch: 'full',
            component: UserTasksComponent,
            canActivate: [AuthActivate],
        },
        {
            path: ':taskId',
            component: CurrentTaskComponent,
            canActivate: [AuthActivate],
        }
    ]
  },
  {
    path: 'add-task',
    component: NewTaskComponent,
    canActivate: [AuthActivate],
  },
  {
    path: 'tasks',
    component: AllTasksComponent,
    // canActivate: [AuthActivate],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
