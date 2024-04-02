# TMSAngular

This project was generated with [Angular CLI]

## Development server

Go to `cd frontend` and Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Go to `cd api` and Run `npm start`to build the project.

## Public and Private parts

In `user.service.ts` we check if user is Logged and use this in HTML with *ngIf

## 4 (Four) different dynamic pages 

/tasks
/my-tasks
/my-tasks/65f948e7255dc3fea8b683fc this is current-task
/add-task
/profile - here we can edit profile

## Specific pages 

/tasks here are all tasks from database with details

## Communicate to a remote service 

I use MongoDB

## Implement authentication

authenticate.component.ts

## Implement all CRUD operations

In `task module` and in other I have all CRUD operations

##	At least 5 routes

/tasks
/my-tasks
/my-tasks/65f948e7255dc3fea8b683fc 
/add-task
/profile 
/home
/login
/logout
/register

## Implement route guards for the private AND the public part

In task-routing.modules.ts is implementing

## Apply error handling and data validation 

In core module are errors and in html are validations

