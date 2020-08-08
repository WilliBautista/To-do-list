import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
// Core
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// Services
import { LoginGuard } from './../services/guards/login.guard';
// Components
import { PagesComponent } from './pages.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
// Third parties
import * as moment from 'moment';

moment.locale('es');

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
          description: moment(new Date()).format('dddd, DD MMMM'),
        },
      },
      {
        path: ':action',
        component: CreateTaskComponent,
        data: {
          title: 'Crear nueva tarea'
        }
      },
      {
        path: ':action/:id/:title',
        component: UpdateTaskComponent,
        data: {
          title: 'Actualizar tarea'
        }
      },
      {
        path: ':title/:id',
        component: TaskDetailComponent,
        data: {
          title: 'Detalle'
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
