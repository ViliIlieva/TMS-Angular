import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { UserTasksComponent } from './user-tasks/user-tasks.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { AppInterceptorProvider } from './app.interceptor';
import { AuthenticateComponent } from './authenticate/authenticate.component';

@NgModule({
  declarations: [
    AppComponent,
    UserTasksComponent,
    TasksListComponent,
    HomeComponent,
    AllTasksComponent,
    AuthenticateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    SharedModule,
    UserModule,
    TaskModule
  ],
  providers: [AppInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
