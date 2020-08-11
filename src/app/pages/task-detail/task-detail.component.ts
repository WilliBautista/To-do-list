import { UserService } from 'src/app/services/user.service';
// Core
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Services
import { TasksService } from './../../services/tasks.service';
import { LoginService } from './../../services/login.service';
// Interface
import { UserInfo } from 'src/app/interfaces/user.interface';
import { Task } from './../../interfaces/tasks.interface';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent {

  task: Task;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tasksService: TasksService,
    private loginService: LoginService,
    private userService: UserService
  ) {
    this.tasksService.getTask(
        this.userAuth.authtoken,
        this.userAuth.csrfToken,
        this.activatedRoute.snapshot.paramMap.get('id')
      ).subscribe((res: Task) => {
        this.userService.getUser(
          this.userAuth.authtoken,
          this.userAuth.csrfToken,
          res.responsable_id
        ).subscribe((user: UserInfo) => {
          res.responsable = user;
          res.status = '1';
          this.task = res;

          console.log(this.task);
          ;
        });
      });
  }

  get userAuth() {
    return this.loginService.userValue;
  }
}
