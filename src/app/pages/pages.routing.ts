import { UpdateTaskComponent } from './update-task/update-task.component';
import { PagesComponent } from './pages.component';
// Core
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// Services
import { LoginGuard } from './../services/guards/login.guard';
// Components
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TasksComponent } from './tasks/tasks.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import * as moment from 'moment';

const routes: Routes = [
  {
    path: 'tasks',
    component: PagesComponent,
    canActivate: [ LoginGuard ],
    children: [
      {
        path: '',
        component: TasksComponent,
        data: {
          title: 'To Do List',
          description: moment(new Date()).format('dddd, DD \d\e MMMM'),
        },
      },
      {
        path: 'create',
        component: CreateTaskComponent,
        data: {
          title: 'Crear nueva tarea'
        }
      },
      {
        path: ':title/:id',
        component: TaskDetailComponent,
        pathMatch: 'full',
        data: {
          title: 'Detalle'
        }
      },
      {
        path: ':title/edit/:id',
        component: UpdateTaskComponent,
        pathMatch: 'full',
        data: {
          title: 'Actualizar tarea'
        }
      }
    ],
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule {}
