import { HeaderComponent } from './../shared/header/header.component';
// Core
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Angular material Modules
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
// Modules
import { SharedModule } from './../shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// Third parties
import { GravatarModule } from 'ngx-gravatar';
// Components
import { TasksComponent } from './tasks/tasks.component';
import { CardTaskComponent } from '../components/card-task/card-task.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { PagesComponent } from './pages.component';
import { CreateUpdateTaskComponent } from '../components/create-update-task/create-update-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';

@NgModule({
  declarations: [
    PagesComponent,
    TasksComponent,
    CardTaskComponent,
    TaskDetailComponent,
    CreateUpdateTaskComponent,
    CreateTaskComponent,
    UpdateTaskComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    SharedModule,
    GravatarModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    NgxMatTimepickerModule,
    NgxMatMomentModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    SweetAlert2Module.forRoot(),
  ]
})
export class PagesModule {}
