// Core
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// Services
import { LoginGuard } from './../services/guards/login.guard';
// Components
import { AppComponent } from './../app.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TasksComponent } from './tasks/tasks.component';
import { CreateTaskComponent } from './create-task/create-task.component';

const routes: Routes = [
  {
    path: 'tasks',
    component: AppComponent,
    canActivate: [ LoginGuard ],
    children: [
      { path: '', component: TasksComponent },
      { path: 'create', component: CreateTaskComponent },
      { path: ':title/:id', component: TaskDetailComponent }
    ],
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule {}
